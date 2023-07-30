// Thank you to the Multimaxi Traminfo developers for publihing the full React source code of their project...

const TRAVELINFO_TRIP_BASEURL = 'https://api.delijn.be/travelinfo-trip/v1'
const TRAVELINFO_TRIP_KEY = "2ebe6ee98dc14965b22c294c436c9ac0" // This is a public key, so it's fine to publish it here.

export function mapTripToLijn(trip, servedLineDirectionsMap) {
  if (!trip) {
    return undefined
  }
  const passage = trip.passages[0]
  const lineDirectionId =
    trip.lineDirection.id ||
    trip.lineDirection.line.id + trip.lineDirection.uraDirectionCode
  const lineDirection = servedLineDirectionsMap[lineDirectionId]
  if (!lineDirection || passage.scheduleType === 'NOT_SERVED') {
    return undefined
  }
  return {
    predictionStatussen: passage.realtimeStatuses,
    vertrekTheoretischeTijdstip: passage.plannedPassage.departureEpoch,
    aankomstTheoretischTijdstip: passage.plannedPassage.arrivalEpoch,
    vertrekRealtimeTijdstip: passage.realtimePassage?.departureEpoch,
    aankomstRealtimeTijdstip: passage.realtimePassage?.arrivalEpoch,
    lijnNummerPubliek: lineDirection.line.publicLineNr,
    lijnRichting: lineDirection.description,
    bestemming: trip.planningDestination,
    richtingCode: lineDirection.directionCode,
    kleurAchterGrond: lineDirection.line.lineColor.background,
    kleurAchterGrondRand: lineDirection.line.lineColor.backgroundBorder,
    kleurVoorGrond: lineDirection.line.lineColor.foreground,
    merged: passage.merged,
    eindHalte: passage.lastStop,
  }
}

export function mapTripsToLijnen(trips, servedLineDirectionsMap) {
  return trips
    .map((trip) => mapTripToLijn(trip, servedLineDirectionsMap))
    .filter(Boolean)
}

export function isTripValid(trip, includeEindHaltes, serverTijd) {
  if (!includeEindHaltes && trip.eindHalte) {
    return false
  }

  if (trip.merged) {
    return true
  }

  return (
    (trip.vertrekRealtimeTijdstip || trip.vertrekTheoretischeTijdstip) >=
    serverTijd
  )
}

async function getMultivertrekkenForStop({
  haltenummer,
  type = 'MERGE',
  exploitationDate,
}) {
  const searchParams = new URLSearchParams({
    type,
    enrichmentType: 'FULL',
  })

  if (exploitationDate) {
    searchParams.set('exploitationDate', exploitationDate)
  }

  const url =
    `${TRAVELINFO_TRIP_BASEURL}/stops/${haltenummer}/trips?` +
    searchParams.toString()
  const { trips, servedLineDirections, serverDateTime, statusCode, message } =
    await fetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': TRAVELINFO_TRIP_KEY,
      },
    }).then((data) => data.json())

  if (statusCode && statusCode !== 200) {
    throw new Error('MultivertrekkenForStop error: ' + message)
  }
  const servedLineDirectionsMap = servedLineDirections.reduce(
    (map, lineDirection) => ({
      ...map,
      [lineDirection.id]: lineDirection,
    }),
    {},
  )

  const lijnen = mapTripsToLijnen(trips, servedLineDirectionsMap)

  return {
    lijnen,
    serverTijd: serverDateTime,
  }
}

export async function getMultivertrekken(
  haltenummers,
  aantal,
  includeEindHaltes,
) {
  const haltenummerArray = haltenummers.split('+')
  const results = await Promise.allSettled(
    haltenummerArray.map((haltenummer) =>
      getMultivertrekkenForStop({
        haltenummer,
        type: 'MERGE',
      }),
    ),
  )

  let hasErrors = false
  let serverTijd = Date.now()
  const lijnen = results
    .reduce((allLines, nextResult) => {
      if (nextResult.status === 'fulfilled') {
        serverTijd = nextResult.value.serverTijd || serverTijd
        return allLines.concat(nextResult.value.lijnen)
      }

      hasErrors = true
      return allLines
    }, [])
    .filter((trip) => isTripValid(trip, includeEindHaltes, serverTijd))
    .sort((a, b) => {
      return getPassageTime(a) - getPassageTime(b)
    })
    .slice(0, aantal)

  if (!lijnen.length && hasErrors) {
    throw new Error('No lines were returned and at least one call had an error')
  }

  return {
    lijnen,
    serverTijd,
  }
}

export function getPassageTime(passage) {
  return passage.eindHalte
    ? passage.aankomstRealtimeTijdstip || passage.aankomstTheoretischTijdstip
    : passage.vertrekRealtimeTijdstip || passage.vertrekTheoretischeTijdstip
}

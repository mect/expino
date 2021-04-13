import qs from "qs";

const apiToken = "49b7fd04400c5454352b8fb34c7f1566";
const apiUrl = "https://api.openweathermap.org/data/2.5";

const fetchApi = (endPoint, payload = {}, method = "get", headers = {}) => {
  const request = {
    method,
    headers,
    ...(method !== "get"
      ? {
          body: JSON.stringify(payload),
        }
      : {}),
  };

  const requestUrl = `${apiUrl}${endPoint}?appid=${apiToken}${
    method === "get" ? `&${qs.stringify(payload)}` : ""
  }`;

  return fetch(requestUrl, request)
    .then((response) =>
      response
        .json()
        .then((json) => ({ json, response }))
        .catch(() => ({ json: {}, response }))
    )
    .then(({ json, response }) => {
      if (response.ok === false) {
        throw json;
      }
      return json;
    })
    .catch((e) => {
      if (e.response && e.response.json) {
        return e.response.json().then((json) => {
          if (json) throw json;
          throw e;
        });
      } else {
        throw e;
      }
    });
};

export const fetchForecastByCityName = (cityName) =>
  fetchApi(`/forecast`, { q: cityName, units: "metric" });
export const fetchWeeklyForecast = (cityName) =>
  new Promise((resolve) => {
    window.jQuery
      .getJSON({
        method: "GET",
        data: {
          q: `select * from weather.forecast 
            where woeid in (select woeid from geo.places(1) 
            where text="${cityName}}") and u='c'`,
          format: "json",
          env: "store://datatables.org/alltableswithkeys",
        },
        url: "https://query.yahooapis.com/v1/public/yql",
      })
      .done((res) => {
        resolve(res.query.results.channel);
      });
  });

// Credit to https://gist.github.com/ttsvetko/3f53f4754af5658285e8
export const getYahooWeatherIcon = (condid) => {
  let icon = "";
  switch (condid) {
    case "0":
      icon = "wi-tornado";
      break;
    case "1":
      icon = "wi-storm-showers";
      break;
    case "2":
      icon = "wi-tornado";
      break;
    case "3":
      icon = "wi-thunderstorm";
      break;
    case "4":
      icon = "wi-thunderstorm";
      break;
    case "5":
      icon = "wi-snow";
      break;
    case "6":
      icon = "wi-rain-mix";
      break;
    case "7":
      icon = "wi-rain-mix";
      break;
    case "8":
      icon = "wi-sprinkle";
      break;
    case "9":
      icon = "wi-sprinkle";
      break;
    case "10":
      icon = "wi-hail";
      break;
    case "11":
      icon = "wi-showers";
      break;
    case "12":
      icon = "wi-showers";
      break;
    case "13":
      icon = "wi-snow";
      break;
    case "14":
      icon = "wi-storm-showers";
      break;
    case "15":
      icon = "wi-snow";
      break;
    case "16":
      icon = "wi-snow";
      break;
    case "17":
      icon = "wi-hail";
      break;
    case "18":
      icon = "wi-hail";
      break;
    case "19":
      icon = "wi-cloudy-gusts";
      break;
    case "20":
      icon = "wi-fog";
      break;
    case "21":
      icon = "wi-fog";
      break;
    case "22":
      icon = "wi-fog";
      break;
    case "23":
      icon = "wi-cloudy-gusts";
      break;
    case "24":
      icon = "wi-cloudy-windy";
      break;
    case "25":
      icon = "wi-thermometer";
      break;
    case "26":
      icon = "wi-cloudy";
      break;
    case "27":
      icon = "wi-night-cloudy";
      break;
    case "28":
      icon = "wi-day-cloudy";
      break;
    case "29":
      icon = "wi-night-cloudy";
      break;
    case "30":
      icon = "wi-day-cloudy";
      break;
    case "31":
      icon = "wi-night-clear";
      break;
    case "32":
      icon = "wi-day-sunny";
      break;
    case "33":
      icon = "wi-night-clear";
      break;
    case "34":
      icon = "wi-day-sunny-overcast";
      break;
    case "35":
      icon = "wi-hail";
      break;
    case "36":
      icon = "wi-day-sunny";
      break;
    case "37":
      icon = "wi-thunderstorm";
      break;
    case "38":
      icon = "wi-thunderstorm";
      break;
    case "39":
      icon = "wi-thunderstorm";
      break;
    case "40":
      icon = "wi-storm-showers";
      break;
    case "41":
      icon = "wi-snow";
      break;
    case "42":
      icon = "wi-snow";
      break;
    case "43":
      icon = "wi-snow";
      break;
    case "44":
      icon = "wi-cloudy";
      break;
    case "45":
      icon = "wi-lightning";
      break;
    case "46":
      icon = "wi-snow";
      break;
    case "47":
      icon = "wi-thunderstorm";
      break;
    case "3200":
      icon = "wi-cloud";
      break;
    default:
      icon = "wi-cloud";
      break;
  }

  return icon;
};

// Credit to https://gist.github.com/tbranyen/62d974681dea8ee0caa1
export const icons = {
  200: {
    label: "thunderstorm with light rain",
    icon: "storm-showers",
  },

  201: {
    label: "thunderstorm with rain",
    icon: "storm-showers",
  },

  202: {
    label: "thunderstorm with heavy rain",
    icon: "storm-showers",
  },

  210: {
    label: "light thunderstorm",
    icon: "storm-showers",
  },

  211: {
    label: "thunderstorm",
    icon: "thunderstorm",
  },

  212: {
    label: "heavy thunderstorm",
    icon: "thunderstorm",
  },

  221: {
    label: "ragged thunderstorm",
    icon: "thunderstorm",
  },

  230: {
    label: "thunderstorm with light drizzle",
    icon: "storm-showers",
  },

  231: {
    label: "thunderstorm with drizzle",
    icon: "storm-showers",
  },

  232: {
    label: "thunderstorm with heavy drizzle",
    icon: "storm-showers",
  },

  300: {
    label: "light intensity drizzle",
    icon: "sprinkle",
  },

  301: {
    label: "drizzle",
    icon: "sprinkle",
  },

  302: {
    label: "heavy intensity drizzle",
    icon: "sprinkle",
  },

  310: {
    label: "light intensity drizzle rain",
    icon: "sprinkle",
  },

  311: {
    label: "drizzle rain",
    icon: "sprinkle",
  },

  312: {
    label: "heavy intensity drizzle rain",
    icon: "sprinkle",
  },

  313: {
    label: "shower rain and drizzle",
    icon: "sprinkle",
  },

  314: {
    label: "heavy shower rain and drizzle",
    icon: "sprinkle",
  },

  321: {
    label: "shower drizzle",
    icon: "sprinkle",
  },

  500: {
    label: "light rain",
    icon: "rain",
  },

  501: {
    label: "moderate rain",
    icon: "rain",
  },

  502: {
    label: "heavy intensity rain",
    icon: "rain",
  },

  503: {
    label: "very heavy rain",
    icon: "rain",
  },

  504: {
    label: "extreme rain",
    icon: "rain",
  },

  511: {
    label: "freezing rain",
    icon: "rain-mix",
  },

  520: {
    label: "light intensity shower rain",
    icon: "showers",
  },

  521: {
    label: "shower rain",
    icon: "showers",
  },

  522: {
    label: "heavy intensity shower rain",
    icon: "showers",
  },

  531: {
    label: "ragged shower rain",
    icon: "showers",
  },

  600: {
    label: "light snow",
    icon: "snow",
  },

  601: {
    label: "snow",
    icon: "snow",
  },

  602: {
    label: "heavy snow",
    icon: "snow",
  },

  611: {
    label: "sleet",
    icon: "sleet",
  },

  612: {
    label: "shower sleet",
    icon: "sleet",
  },

  615: {
    label: "light rain and snow",
    icon: "rain-mix",
  },

  616: {
    label: "rain and snow",
    icon: "rain-mix",
  },

  620: {
    label: "light shower snow",
    icon: "rain-mix",
  },

  621: {
    label: "shower snow",
    icon: "rain-mix",
  },

  622: {
    label: "heavy shower snow",
    icon: "rain-mix",
  },

  701: {
    label: "mist",
    icon: "sprinkle",
  },

  711: {
    label: "smoke",
    icon: "smoke",
  },

  721: {
    label: "haze",
    icon: "day-haze",
  },

  731: {
    label: "sand, dust whirls",
    icon: "cloudy-gusts",
  },

  741: {
    label: "fog",
    icon: "fog",
  },

  751: {
    label: "sand",
    icon: "cloudy-gusts",
  },

  761: {
    label: "dust",
    icon: "dust",
  },

  762: {
    label: "volcanic ash",
    icon: "smog",
  },

  771: {
    label: "squalls",
    icon: "day-windy",
  },

  781: {
    label: "tornado",
    icon: "tornado",
  },

  800: {
    label: "clear sky",
    icon: "sunny",
  },

  801: {
    label: "few clouds",
    icon: "cloudy",
  },

  802: {
    label: "scattered clouds",
    icon: "cloudy",
  },

  803: {
    label: "broken clouds",
    icon: "cloudy",
  },

  804: {
    label: "overcast clouds",
    icon: "cloudy",
  },

  900: {
    label: "tornado",
    icon: "tornado",
  },

  901: {
    label: "tropical storm",
    icon: "hurricane",
  },

  902: {
    label: "hurricane",
    icon: "hurricane",
  },

  903: {
    label: "cold",
    icon: "snowflake-cold",
  },

  904: {
    label: "hot",
    icon: "hot",
  },

  905: {
    label: "windy",
    icon: "windy",
  },

  906: {
    label: "hail",
    icon: "hail",
  },

  951: {
    label: "calm",
    icon: "sunny",
  },

  952: {
    label: "light breeze",
    icon: "cloudy-gusts",
  },

  953: {
    label: "gentle breeze",
    icon: "cloudy-gusts",
  },

  954: {
    label: "moderate breeze",
    icon: "cloudy-gusts",
  },

  955: {
    label: "fresh breeze",
    icon: "cloudy-gusts",
  },

  956: {
    label: "strong breeze",
    icon: "cloudy-gusts",
  },

  957: {
    label: "high wind, near gale",
    icon: "cloudy-gusts",
  },

  958: {
    label: "gale",
    icon: "cloudy-gusts",
  },

  959: {
    label: "severe gale",
    icon: "cloudy-gusts",
  },

  960: {
    label: "storm",
    icon: "thunderstorm",
  },

  961: {
    label: "violent storm",
    icon: "thunderstorm",
  },

  962: {
    label: "hurricane",
    icon: "cloudy-gusts",
  },
};

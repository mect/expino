import React, { Component } from "react";
import { getMultivertrekken } from "../apis/delijn_api";

class DeLijn extends Component {
  static defaultProps = {
    amount: 10,
    distanceTime: 0,
  };

  constructor(props) {
    super(props);
    this.state = { departures: [], notices: [] };

    setInterval(this.fetchInfo, 10 * 1000);
    this.fetchInfo();
  }

  fetchInfo = async () => {
      const res = await getMultivertrekken(this.props.haltes, this.props.amount+15, false)

      let deps = [];
      let c = 0;
      while (deps.length < this.props.amount) {
        const line = res.lijnen[c];
        if (!line) {
          break;
        }

        if (
          (line.vertrekRealtimeTijdstip || line.vertrekTheoretischeTijdstip) - new Date().getTime() <
            this.props.distanceTime * 60 * 1000 &&
          !line.predictionDeleted
        ) {
          c++;
          continue;
        }

        deps.push({
          lineNumber: line.lijnNummerPubliek,
          color: line.kleurAchterGrond,
          textColor: line.kleurVoorGrond,
          borderColor: line.kleurVoorGrondRand,
          direction: line.lijnRichting,
          time:
            (line.vertrekRealtimeTijdstip || line.vertrekTheoretischeTijdstip) -
            new Date().getTime(),
          realtime: line.predictionStatussen.indexOf("REALTIME") > -1,
          scrapped: line.predictionDeleted,
        });

        c++;
      }

      this.setState({ departures: deps });
  };

  render() {
    const rows = this.state.departures
      .slice(0, this.props.max || this.state.departures.length)
      .map((i, j) => {
        let rt = i.realtime ? (
          <img width={"30px"} src={"css/realtime.svg"} />
        ) : (
          ""
        );

        if (i.scrapped) {
          return (
            <tr key={j}>
              <td className="line">
                <div
                  style={{
                    color: i.textColor,
                    backgroundColor: i.color,
                    border: `1px solid ${i.borderColor}`,
                    borderRadius: "10px",
                    textAlign: "center",
                    padding: "2px 10px",
                    width: "60px",
                  }}
                >
                  {i.lineNumber}
                </div>
              </td>
              <td className="direction">{i.direction}</td>
              <td className="departure-time" style={{ color: "darkred" }}>
                RIJDT NIET
              </td>
            </tr>
          );
        }

        return (
          <tr key={j}>
            <td className="line">
              <div
                style={{
                  color: i.textColor,
                  backgroundColor: i.color,
                  border: `1px solid ${i.borderColor}`,
                  borderRadius: "10px",
                  textAlign: "center",
                  padding: "2px 10px",
                  width: "60px",
                }}
              >
                {i.lineNumber}
              </div>
            </td>
            <td className="direction">{i.direction}</td>
            <td className="departure-time">
              {Math.round(i.time / 1000 / 60)}'{rt}
            </td>
          </tr>
        );
      });

    return (
      <div>
        <table className={this.props.tableClassName}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default DeLijn;

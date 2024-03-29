import React, { Component } from "react";
import { Card, Row, Icon } from "react-materialize";
import Marquee from "react-fast-marquee";
import { HOST, TOKEN } from "../variables";
import { unescape } from "lodash";

class Ticker extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };
  }

  componentDidMount() {
    this.loadTicker();
    setInterval(this.loadTicker, 60 * 60 * 1000); // every hour
  }

  loadTicker = async () => {
    if (this.props.display.tickerRSS) {
      return this.loadRSS();
    }
    this.setState({ items: [this.props.display.tickerText] });
  };

  loadRSS = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    fetch(`${HOST}/display/rss`, requestOptions)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const items = data.querySelectorAll("entry");
        const titles = [];
        items.forEach((el) => {
          titles.push(unescape(el.querySelector("title").innerHTML.toString()));
        });

        this.setState({ items: titles.slice(0, 15) });
      });
  };

  render() {
    if (this.state.items.length < 1) {
      return (
        <Row className="ticker-margin">
          <Card className="ticker-card-style">No data</Card>
        </Row>
      );
    }

    let content =
      "This is a weird hack to not make Marquee crash the browser. If you see this please contact your nearest software engineer. ";
    content = this.state.items.map((item, i) => {
      return (
        <span className="ticker" key={i}>
          {item}&nbsp;&nbsp;---&nbsp;&nbsp;
        </span>
      );
    });

    return (
      <Row className="ticker-margin">
        <Card className="ticker-card-style">
          <Marquee loop={0} speed={70} gradient={false}>
            {content}
          </Marquee>
        </Card>
      </Row>
    );
  }
}

export default Ticker;

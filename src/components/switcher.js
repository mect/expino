import React from "react";
import { Card, Row, Col } from "react-materialize";
import io from "socket.io-client";
import { getAllNews } from "../apis/news_api";
import NewsItem from "./newsitem";
import Weather from "./weather";
import Traffic from "./traffic";
import Clock from "./clock";
import Social from "./social";
import Ticker from "./ticker";
import Trains from "./trains";
import Forecast from "./forecast";
import "velocity-animate/velocity.ui";
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import { HOST, LOGO } from "../variables";

const availableSlides = {
  traffic: <Traffic time={15} title="Verkeer in de buurt" />,
  social: <Social time={15} title="Zorginnovatie op social media" />,
  trains: <Trains time={15} title="Dienstregeling Antwerpen-Centraal" />,
  weather: <Forecast time={15} title="Het Weer" />,
};

class Switcher extends React.Component {
  count = 0;
  featureSlides = [];
  graphs = [];

  constructor(props) {
    super(props);

    // connect live reloader
    const socket = io.connect(HOST);
    socket.on("connect", () => {
      console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
    });
    socket.on("*", console.log);
    socket.on("update", this.loadFeatureSlides);

    this.state = {
      next: [],
      items: [],
    };
  }

  componentDidMount() {
    this.rotate();
    this.loadNewsItems();
  }

  loadNewsItems = async () => {
    let res = await getAllNews();

    const items = [];
    for (let item of res) {
      for (let langItem of item.languageItems) {
        items.push(
          <NewsItem
            id={item.ID}
            content={langItem.content}
            title={langItem.title}
            language={langItem.language}
            time={item.slideTime}
          />
        );
      }
    }
    items.push(availableSlides.trains);
    this.setState({ items: items });
  };

  getCount = () => {
    this.count++;
    return this.count;
  };

  rotate = () => {
    let items = this.state.items;
    if (items.length === 0) {
      // nothing to do here, come back in a sec
      setTimeout(this.rotate.bind(this), 1000);
      return;
    }

    // change order in array to put the current last
    const lastZero = items[0];
    items = items.slice(1, items.length);
    items.push(lastZero);

    this.setState({
      items,
      next: this.composeNextSlides(items),
    });

    let slideTime = 15000;
    if (items[0] && items[0].props.time) {
      slideTime = items[0].props.time * 1000;
    }
    setTimeout(this.rotate, slideTime);
  };

  composeNextSlides = (items) => {
    const out = [];

    let c = 0;
    let j = 0;
    while (out.length < 2) {
      if (
        !items[c].props.id ||
        (items[c].props.language == "NL" &&
          items[c].props.id != items[0].props.id)
      ) {
        // TODO: not hard code main language
        out.push(
          <Card
            className={
              j === 0
                ? "up-next left-column-card"
                : "up-next-next left-column-card"
            }
            key={j}
          >
            <span className="up-next-style">{items[c].props.title}</span>
          </Card>
        );

        j++;
      }

      c++;
      if (c >= items.length) {
        break;
      }
    }

    return out.reverse();
  };

  render() {
    return (
      <div>
        <Row>
          <Col s={2}>
            <Row>
              <div className="logo-margin">
                <img className="logo" src={LOGO} alt="logo" />
              </div>
            </Row>
            <Row>
              <Card className="left-column-card">
                <Clock />
              </Card>
            </Row>
            <Row>
              <Card className="left-column-card weather">
                <Weather />
              </Card>
            </Row>
            <Row>
              <h3 id="volgende">Volgende:</h3>
            </Row>
            <VelocityTransitionGroup
              enter={{ animation: "slideDown" }}
              leave={{ animation: "slideUp" }}
            >
              <h3>{this.state.next}</h3>
            </VelocityTransitionGroup>
          </Col>
          <Col s={10}>
            <VelocityTransitionGroup>
              <Card className="mainslide" key={this.count}>
                {this.state.items[0]}
              </Card>
            </VelocityTransitionGroup>
          </Col>
        </Row>
        <Ticker />
      </div>
    );
  }
}

export default Switcher;

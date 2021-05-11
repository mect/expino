import React from "react";
import { Card, Row, Col } from "react-materialize";
import { getAllNews } from "../apis/news_api";
import NewsItem from "./newsitem";
import Weather from "./weather";
import Traffic from "./traffic";
import Clock from "./clock";
import Social from "./social";
import Ticker from "./ticker";
import Trains from "./trains";
import DeLijn from "./delijn";
import Forecast from "./forecast";
import "velocity-animate/velocity.ui";
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import { HOST, LOGO, STYLE } from "../variables";

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

  ws = null;

  constructor(props) {
    super(props);

    this.state = {
      next: [],
      items: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.connectLiveReload();
    this.rotate();
    this.loadNewsItems();
  }

  connectLiveReload = () => {
    let uri = HOST.replace("https", "wss").replace("http", "ws") + "/ws";
    this.ws = new WebSocket(uri);

    this.ws.onopen = function () {
      console.log("Connected to WS");
    };

    this.ws.onmessage = (e) => {
      if (e.data == "UPDATE") {
        this.loadNewsItems();
      }
    };

    const reconnect = () => {
      // connection closed, discard old websocket and create a new one in 5s
      this.ws = null;
      setTimeout(this.connectLiveReload, 5000);
    };

    this.ws.onclose = reconnect;

    this.ws.onerror = () => {
      if (this.ws) {
        this.ws.close();
      }

      reconnect();
    };
  };

  loadNewsItems = async () => {
    this.setState({
      loading: true,
    });

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
    //items.push(availableSlides.trains);
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
      loading: false,
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
    if (this.state.loading) {
      return (
        <div className="ui-loader">
          <div className="expino-logo">
            <img
              alt="Expino"
              className="img-fluid"
              src="./css/expinologo.png"
            />
            <div className="spinner">
              <i className="fas fa-circle-notch fa-spin"></i>
            </div>
          </div>
        </div>
      );
    }

    if (STYLE == "close") {
      return (
        <div>
          <Row className="switcher">
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
            <Col s={5}>
              <VelocityTransitionGroup>
                <Card className="mainslide" key={this.count}>
                  {this.state.items[0]}
                </Card>
              </VelocityTransitionGroup>
            </Col>
            <Col s={5}>
              <VelocityTransitionGroup>
                <Card className="sideslide">
                  <Traffic time={15} title="Verkeer in de buurt" />
                </Card>
                <Card className="sideslide">
                  <DeLijn
                    tableClassName="striped delijn"
                    haltes={"102085+102090"}
                    amount={6}
                    distanceTime={10}
                  ></DeLijn>
                </Card>
              </VelocityTransitionGroup>
            </Col>
          </Row>
          <Ticker />
        </div>
      );
    }

    return (
      <div>
        <Row className="switcher">
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

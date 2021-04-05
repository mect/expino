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
import { LOGO } from "../variables";

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
    //const socket = io.connect(HOST)
    //socket.on('update', this.loadFeatureSlides.bind(this))

    this.state = {
      next: [],
      items: [],
    };
  }

  componentDidMount() {
    this.rotate();
    this.loadNewsItems();
  }

  loadNewsItems = () => {
    let res = [
      {
        title: "Vandaag in uw kar",
        content: `<h2 style="text-align: center">Patatten</h2><img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Aardappel_%27Dor%C3%A9%27_%28Solanum_tuberosum_%27Dor%C3%A9%27%29.jpg"/>`,
        slideTime: 10,
      },
      {
        title: "Zeephuisje",
        content: `<h2>Opgelet: verdeling week 01/04</h2> Geen verdeling wegens Corona, we zien u graag volgende week terug!`,
        slideTime: 10,
      },
      {
        title: "Markten",
        content: `<table className="striped">
                        <tr><td>Kinderkleding</td><td>01/04 - 03/04</td></tr>
                        <tr><td>Speelgoed</td><td>01/05 - 03/05</td></tr>
                        <tr><td>Kapotte LCDs</td><td>01/06 - 03/06</td></tr>
                        </table>`,
        slideTime: 10,
      },
    ];
    res.map((i) => console.log(i));
    const items = res.map((i) => (
      <NewsItem content={i.content} title={i.title} time={i.slideTime} />
    ));
    items.push(availableSlides.trains);
    this.setState({ items: items });
    console.log("STATENEWS", this.state);
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
    console.log("STATE", this.state);

    // change order in array to put the current last
    const lastZero = items[0];
    items = items.slice(1, items.length);
    items.push(lastZero);

    console.log(items.slice(1, 3).reverse());

    this.setState({
      items,
      next: items
        .slice(1, 3)
        .reverse()
        .map((i, j) => {
          if (!i) {
            return;
          }
          return (
            <Card
              className={
                j === 0
                  ? "up-next left-column-card"
                  : "up-next-next left-column-card"
              }
              key={this.getCount()}
            >
              <span className="up-next-style">{i.props.title}</span>
            </Card>
          );
        }),
    });

    let slideTime = 15000;
    if (items[0] && items[0].props.time) {
      slideTime = items[0].props.time * 1000;
    }
    setTimeout(this.rotate, slideTime);
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

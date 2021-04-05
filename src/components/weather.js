import React, { Component } from "react";
import { Row, Preloader, Col } from "react-materialize";
import { fetchForecastByCityName, icons } from "../apis/weather_api";
import { WEATHERCITY } from "../variables";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { now: null };
    this.loadWeather.bind(this)();

    setInterval(this.loadWeather.bind(this), 60000);
  }

  loadWeather() {
    fetchForecastByCityName(WEATHERCITY).then(this.onWeatherInfo);
  }

  onWeatherInfo = (res) => {
    this.setState({ now: res.list[0] });
    console.log(res.list[0]);
  };

  getIcon(code) {
    // credits to https://gist.github.com/tbranyen/62d974681dea8ee0caa1
    let icon = icons[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = "day-" + icon;
    }

    // Finally tack on the prefix.
    return "wi wi-" + icon;
  }

  roundTemp(t) {
    return Math.round(t);
  }

  render() {
    if (!this.state.now) {
      return <Preloader size="small" />;
    }

    return (
      <div>
        <h2>
          <i className={this.getIcon(this.state.now.weather[0].id)}></i>{" "}
          {this.roundTemp(this.state.now.main.temp)}&deg;
        </h2>
      </div>
    );
  }
}

export default Weather;

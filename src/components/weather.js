import React, { Component } from 'react';
import { Row, Preloader } from 'react-materialize'
import { fetchForecastByCityName, icons } from '../apis/weather_api'


class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = { now: null }
        this.loadWeather.bind(this)()

        setInterval(this.loadWeather.bind(this), 60000)
    }

    loadWeather() {
        fetchForecastByCityName("Geel, BE").then(this.onWeatherInfo.bind(this))
    }

    onWeatherInfo(res) {
        this.setState({ now: res.list[0] })
        console.log(res.list[0])
    }

    getIcon(code) {
        // credits to https://gist.github.com/tbranyen/62d974681dea8ee0caa1
        let icon = icons[code].icon;

        // If we are not in the ranges mentioned above, add a day/night prefix.
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }

        // Finally tack on the prefix.
        return 'wi wi-' + icon;
    }

    roundTemp(t) {
        return Math.round(t * 10.0) / 10.0
    }

    render() {
        if (!this.state.now) {
            return <Preloader size='small'/>
        }
        return <div>
            <Row><h1 style={{textAlign:"center"}}><i className={this.getIcon(this.state.now.weather[0].id)}></i></h1></Row>
            <Row><h2 style={{textAlign:"center"}}>{this.roundTemp(this.state.now.main.temp)}&deg;</h2></Row>
        </div>
    }
}

export default Weather
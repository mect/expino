import React, { Component } from 'react';
import { Row, Preloader, Card, Col } from 'react-materialize'
import { fetchWeeklyForecast, getYahooWeatherIcon } from '../apis/weather_api'

const days = {
    "Mon": "Maandag",
    "Tue": "Dinsdag",
    "Wed": "Woensdag",
    "Thu": "Donderdag",
    "Fri": "Vrijdag",
    "Sat": "Zaterdag",
    "Sun": "Zondag",
}

class Forecast extends Component {
    constructor() {
        super()

        this.state = { loading: true, data: [] }

        fetchWeeklyForecast("Geel, BE").then(this.onWeatherData.bind(this))
    }

    onWeatherData(res) {
        console.log(res.item.forecast)
        this.setState({ loading: false, data: res.item.forecast})
    }

    render() {
        if (this.state.loading) {
            return <Preloader />
        }
        const cards = []

        for(let i = 0; i < 6; i++) {
            const weather = this.state.data[i]
            cards.push(
                <Col key={i} s={2}>
                    <Card title={days[weather.day]}>
                        <h2><i className={`wi ${getYahooWeatherIcon(weather.code)}`}></i></h2>
                        <p>Min: {weather.low}&deg;C</p>
                        <p>Max: {weather.high}&deg;C</p>
                    </Card>
                </Col>
            )
        }

        return <Row>
            <h1>Het Weer</h1>
            {cards}
            <p>Powered by Yahoo</p>
        </Row>
    }
}

export default Forecast
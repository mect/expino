import React, { Component } from 'react';
import { Card, Row, Icon } from 'react-materialize'
import { getItems, getDiff } from '../apis/ticker_api'
import Marquee from 'react-malarquee'

class Ticker extends Component {
    constructor(props) {
        super(props)

        this.state = { metrics: {}, items: [] }

        getItems().then(this.gotItems.bind(this))

        this.fetchItems = this.fetchItems.bind(this)
        this.gotMetric = this.gotMetric.bind(this)

        setInterval(this.fetchItems, 10 * 1000)
    }

    gotItems(res) {
        this.setState({ items: res })
        this.fetchItems()
    }

    fetchItems() {
        for (let item of this.state.items) {
            getDiff(item.setup, item.metric, item.interval, item.back).then(data => this.gotMetric(data, item))
        }
    }

    gotMetric(res, item) {
        const metrics = this.state.metrics
        metrics[item] = res
        this.setState({ metrics })
    }

    render() {
        const content = this.state.items.map((name, i) => {
            const val = this.state.metrics[name]
            return val.result > 0 ? <span className="ticker-up ticker-item-width" key={i}><Icon className="ticker-up-arrow">   forward</Icon> {val.name} +{Math.abs(val.result)} </span> 
            : <span className="ticker-down ticker-item-width"><Icon className="ticker-down-arrow">   forward</Icon> {val.name} -{Math.abs(val.result)} </span>
        })
        return <Row className="ticker-margin">
        <Card className="ticker-card-style">
            <Marquee loop={true} fill={true} rate={50}>
                {content}
            </Marquee>
        </Card>
    </Row>
    }
}

export default Ticker
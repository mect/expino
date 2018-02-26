import React, { Component } from 'react';
import { Card, Row, Icon } from 'react-materialize'
import { getItems, getDiff } from '../apis/ticker_api'
import Marquee from 'react-malarquee'
import io from 'socket.io-client';
import { HOST } from '../variables'

class Ticker extends Component {
    constructor(props) {
        super(props)

        const socket = io.connect(HOST)
        socket.on('update', this.loadItems.bind(this))

        this.state = { metrics: {}, items: [] }

        this.loadItems.bind(this)()

        this.fetchItems = this.fetchItems.bind(this)
        this.gotMetric = this.gotMetric.bind(this)

        setInterval(this.fetchItems, 10 * 1000)
    }

    loadItems() {
        getItems().then(this.gotItems.bind(this))
    }

    gotItems(res) {
        this.setState({ items: res.data })
        this.fetchItems()
    }

    fetchItems() {
        for (let item of this.state.items) {
            getDiff(item.setup, item.metric, item.interval, item.back).then(data => this.gotMetric(data, item))
        }
    }

    gotMetric(res, item) {
        const metrics = this.state.metrics
        metrics[item.id] = res.data
        this.setState({ metrics })
    }

    formatMetric(num) {
        num = Math.abs(num)
        num = Math.round(num*100)/100
        return num
    }

    render() {
        if (this.state.items.length < 1) {
            return <Row className="ticker-margin">
                <Card className="ticker-card-style">
                    No data
                </Card>
            </Row>
        }

        console.log(this.state.metrics)
        let content= "This is a weird hack to not make Marquee crash the browser. If you see this please contact your nearest software engineer. "
        content = this.state.items.map((item, i) => {
            const val = this.state.metrics[item.id]
            if (!val) {
                return <span className="ticker-down ticker-item-width"><Icon className="ticker-down-arrow">   forward</Icon> {item.name} - unknown</span>
            }
            return val.result > 0 ? <span className="ticker-up ticker-item-width" key={i}><Icon className="ticker-up-arrow">   forward</Icon> {item.name} +{this.formatMetric(val.result)}% </span> 
            : <span className="ticker-down ticker-item-width"><Icon className="ticker-down-arrow">   forward</Icon> {item.name} -{this.formatMetric(val.result)}% </span>
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
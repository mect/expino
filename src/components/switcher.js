import React, { Component } from 'react';
import { Card, Row, Col } from 'react-materialize'
import io from 'socket.io-client';
import { getAllNews } from '../apis/news_api'
import NewsItem from './newsitem'
import Weather from './weather'
import Traffic from './traffic'
import Clock from './clock'

class Switcher extends Component {
    constructor(props) {
        super(props)

        // connect live reloader
        const socket = io.connect("http://localhost:8080/")
        socket.on('update', this.loadNews.bind(this))
    
        this.state = { 
            items: [] ,
        }
        
        this.loadNews.bind(this)()         
        setTimeout(this.rotate.bind(this), 5000) //maybe i should be improved
    }

    loadNews() {
        getAllNews().then(this.gotNewsItems.bind(this))
    }

    gotNewsItems(result) {
        this.setState({ items: result.data.map(i => <NewsItem content={i.content} title={i.title} time={i.slideTime}/>) })
    }

    rotate() {
        let items = this.state.items
        const lastZero = items[0]
        items = items.slice(1,items.length)
        items.push(lastZero)

        this.setState({ items })
        
        let slideTime = 5000
        if (items[0]) {
            slideTime= items[0].props.time * 1000
        }
        setTimeout(this.rotate.bind(this), slideTime)
    }

    render() {
        return <div>
            <Row>
            <Col s={2}>
                <Row><Card><Clock/></Card></Row>
                <Row><Card><Weather/></Card></Row>
                <Row><Card><Traffic/></Card></Row>
                <Row><Card title="Up next">{this.state.items[1]}</Card></Row>
                <Row><Card title="Up next next">{this.state.items[2]}</Card></Row>
            </Col>
            <Col s={10}>
                <Card>{this.state.items[0]}</Card>
            </Col>
        </Row>
        <Row>
            <Card>Expino + 100% - BTC -50% - TM -100%</Card>
        </Row>
        </div>

    }
}


export default Switcher
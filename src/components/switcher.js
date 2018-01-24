import React, { Component } from 'react';
import { Card, Row, Col } from 'react-materialize'
import io from 'socket.io-client';
import { getAllNews } from '../apis/news_api'
import NewsItem from './newsitem'
import newsitem from './newsitem';

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
        setInterval(this.rotate.bind(this), 5000)
    }

    loadNews() {
        getAllNews().then(this.gotNewsItems.bind(this))
    }

    gotNewsItems(result) {
        this.setState({ items: result.data.map(i => <NewsItem content={i.content} title={i.title}/>) })
    }

    rotate() {
        let items = this.state.items
        const lastZero = items[0]
        items = items.slice(1,items.length)
        items.push(lastZero)

        this.setState({ items })
    }

    render() {
        return <div>
            <Row>
            <Col s={2}>
                <Row><Card title="Up next">{this.state.items[1]}</Card></Row>
                <Row><Card title="Up next next">{this.state.items[2]}</Card></Row>
                <Row><Card/></Row>
                <Row><Card/></Row>
                <Row><Card/></Row>
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
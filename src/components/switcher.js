import React, { Component } from 'react';
import { Card, Row, Col } from 'react-materialize'
import io from 'socket.io-client';
import { getAllNews } from '../apis/news_api'
import NewsItem from './newsitem'
import Weather from './weather'
import Traffic from './traffic'
import Clock from './clock'
import Social from './social'
import Ticker from './ticker'
import Trains from './trains'
import 'velocity-animate/velocity.ui'
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group'
import '../css/switcher.css';
import { LOGO, HOST } from '../variables'

class Switcher extends Component {
    count = 0
    hardCodedSlides = [<Traffic time={10} title="Verkeer"/>,<Social time={10} title="Sociale Media"/>, <Trains time={100} title="NMBS"/>]

    constructor(props) {
        super(props);

        // connect live reloader
        const socket = io.connect(HOST)
        socket.on('update', this.loadNews.bind(this))
    
        this.state = { 
            items: [],
            next: [],
        };
        
        this.loadNews.bind(this)();
        setTimeout(this.rotate.bind(this), 5000) //maybe i should be improved
    }

    loadNews() {
        getAllNews().then(this.gotNewsItems.bind(this))
    }

    gotNewsItems(result) {
        const items = result.data.map(i => <NewsItem content={i.content} title={i.title} time={i.slideTime}/>).concat(this.hardCodedSlides)
        this.setState({ items, next: items.slice(1,3).reverse().map((i, j) => <Card className={j === 0? "up-next": "up-next-next"} key={this.getCount()}>{i.props.title}</Card>)  })
    }

    getCount() {
        this.count++;
        return this.count
    }

    rotate() {
        let items = this.state.items;
        const lastZero = items[0];
        items = items.slice(1,items.length);
        items.push(lastZero);

        this.setState({ items, next: items.slice(1,3).reverse().map((i, j) => <Card className={j === 0? "up-next": "up-next-next"} key={this.getCount()}>{i.props.title}</Card>)  })

        let slideTime = 5000;
        if (items[0]) {
            slideTime= items[0].props.time * 1000
        }
        setTimeout(this.rotate.bind(this), slideTime)
    }

    render() {
        return <div>
            <Row>
            <Col s={2}>
                <Row><div className="logo-margin"><img className="logo" src={LOGO} alt="zorginnovatie logo"/></div></Row>
                <Row><Card className="left-column-card"><Clock/></Card></Row>
                <Row><Card className="left-column-card"><Weather/></Card></Row>
                <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
                    <h3>{this.state.next}</h3>
                </VelocityTransitionGroup>
       
            </Col>
            <Col s={10}>
                <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
                    <Card className="mainslide" key={this.count}>{this.state.items[0]}</Card>              
                </VelocityTransitionGroup>
            </Col>
        </Row>
        <Ticker/>
        </div>

    }
}


export default Switcher
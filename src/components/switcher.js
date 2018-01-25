import React, { Component } from 'react';
import { Card, Row, Col, Icon } from 'react-materialize'
import { getAllNews } from '../apis/news_api'
import NewsItem from './newsitem';
import '../css/switcher.css';
import { LOGO } from '../variables';

class Switcher extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            items: [] ,
        };

        getAllNews().then(this.gotNewsItems.bind(this));
        setInterval(this.rotate.bind(this), 5000)
    }

    gotNewsItems(result) {
        this.setState({ items: result.data.map(i => <NewsItem content={i.content} title={i.title}/>) })
    }

    rotate() {
        let items = this.state.items;
        const lastZero = items[0];
        items = items.slice(1,items.length);
        items.push(lastZero);

        this.setState({ items })
    }

    render() {
        return <div>
            <Row>
            <Col s={2}>
                <Row><div className="logo-margin"><img className="logo" src={LOGO} alt="zorginnovatie logo"/></div></Row>
                <Row><Card className="left-column-card"></Card></Row>
                <Row><Card className="left-column-card"></Card></Row>
                <Row><Card className="left-column-card">{this.state.items[2]}</Card></Row>
                <Row><Card className="left-column-card">
                    <div className="up-next-title">Up Next:</div>
                    {this.state.items[1]}</Card></Row>
            </Col>
            <Col s={10}>
                <Card className="mainslide">{this.state.items[0]}</Card>
            </Col>
        </Row>
        <Row className="ticker-margin">
            <Card className="ticker-card-style">
                <span className="ticker-up ticker-item-width"><Icon className="ticker-up-arrow">   forward</Icon> Expino + 100%   </span>
                <span className="ticker-down ticker-item-width"><Icon className="ticker-down-arrow">   forward</Icon> BTC -50%   </span>
                <span className="ticker-down ticker-item-width"><Icon className="ticker-down-arrow">   forward</Icon> TM -100%   </span>
            </Card>
        </Row>
        </div>

    }
}


export default Switcher
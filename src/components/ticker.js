import React, { Component } from 'react';
import { Card, Row, Icon } from 'react-materialize'
import Marquee from 'react-malarquee'

class Ticker extends Component {
    render() {
        return <Row className="ticker-margin">
        <Card className="ticker-card-style">
            <Marquee loop={true} fill={true} rate={50}>
                <span className="ticker-up ticker-item-width"><Icon className="ticker-up-arrow">   forward</Icon> Expino + 100%   </span>
                <span className="ticker-down ticker-item-width"><Icon className="ticker-down-arrow">   forward</Icon> BTC -50%   </span>
                <span className="ticker-down ticker-item-width"><Icon className="ticker-down-arrow">   forward</Icon> TM -100%   </span>
            </Marquee>
        </Card>
    </Row>
    }
}

export default Ticker
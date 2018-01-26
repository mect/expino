import React, { Component } from 'react';
import '../css/clock.css';

class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = { time: new Date(), dots: true};
        setInterval(this.update.bind(this),1000)
    }

    update() {
        this.setState({ time: new Date(), dots: !this.state.dots })
    }

    render() {
        let dots = ":";
        if (!this.state.dots) {
            dots = " "
        }
        return <div>
            <h2 className="clock">{this.state.time.getHours() < 10 ? "0"+this.state.time.getHours() : this.state.time.getHours()}{dots}{this.state.time.getMinutes() < 10 ? "0"+this.state.time.getMinutes() : this.state.time.getMinutes()}</h2>
        </div>
    }
}


export default Clock
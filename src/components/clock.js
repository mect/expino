import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = { time: new Date(), dots: true };
    setInterval(this.update.bind(this), 1000);
  }

  update() {
    this.setState({ time: new Date(), dots: !this.state.dots });
  }

  render() {
    let dots = ":";
    if (!this.state.dots) {
      dots = " ";
    }
    let date = null;

    if (this.props.date) {
      date = (
        <h4 className="date">
          {this.state.time.toLocaleString("nl", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </h4>
      );
    }
    return (
      <div>
        <h2 className="clock">
          {this.state.time.getHours() < 10
            ? "0" + this.state.time.getHours()
            : this.state.time.getHours()}
          {dots}
          {this.state.time.getMinutes() < 10
            ? "0" + this.state.time.getMinutes()
            : this.state.time.getMinutes()}
        </h2>
        {date}
      </div>
    );
  }
}

export default Clock;

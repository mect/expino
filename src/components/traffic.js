import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import {
  GoogleMap,
  TrafficLayer,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";
import { compose, withProps } from "recompose";
import { getTraffic } from "../apis/traffic_api";

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA4FyhY4Avz7LHIVpgGTsp3HYEjDDlXiyw&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `55vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(() => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 51.1659867, lng: 4.9160106 }}
      options={{
        streetViewControl: false,
        disableDefaultUI: false,
        draggable: false,
        gestureHandling: "none",
      }}
    >
      <TrafficLayer autoUpdate />
    </GoogleMap>
  );
});

class Traffic extends Component {
  constructor(props) {
    super(props);

    this.state = { trafficInfo: [], map: <Map key={0} />, c: 0 };

    this.loadTrafficInfo = this.loadTrafficInfo.bind(this);
  }

  componentDidMount() {
    this.loadTrafficInfo();
  }

  loadTrafficInfo() {
    getTraffic().then(this.onTrafficInfo.bind(this));
  }

  onTrafficInfo(res) {
    this.setState({ trafficInfo: res.data, c: this.state.c + 1 });
    console.log("MOUNT", this.state.c);
    this.setState({ map: <Map key={this.state.c} />, c: this.state.c + 1 });
  }

  render() {
    return (
      <Row>
        <Col s={12}>
          <h1 className="traffic-title">Het verkeer vandaag:</h1>
        </Col>
        <Col s={6}>
          <div>
            <h4>Het verkeer in Geel:</h4>
          </div>
          <div>{this.state.map}</div>
        </Col>
        <Col s={6}>
          <div>
            <h4>Overzicht files:</h4>
          </div>
          <div>
            {this.state.trafficInfo.map((i, j) => (
              <Row key={j}>
                <p>{i.title}</p>
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    );
  }
}

export default Traffic;

import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import {
  GoogleMap,
  TrafficLayer,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";
import { compose, withProps } from "recompose";

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDtHqNzkhEKus4jP7HBr9a1EJ0Zo5_myMg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `35vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(() => {
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 51.21834848778064, lng: 4.434716130686065 }}
      options={{
        streetViewControl: false,
        disableDefaultUI: true,
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
  }
  render() {
    return (
      <Row>
        <Col s={12}>
          <div>
            <h4>Het verkeer rond Antwerpen:</h4>
          </div>
          <div>{this.state.map}</div>
        </Col>
      </Row>
    );
  }
}

export default Traffic;

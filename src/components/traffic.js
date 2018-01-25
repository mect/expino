import React, { Component } from 'react';
import {  Row, Col } from 'react-materialize'
import { GoogleMap, TrafficLayer, withScriptjs, withGoogleMap } from "react-google-maps"
import { compose, withProps } from 'recompose';
import { getTraffic } from '../apis/traffic_api'

const Map = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `200px` }} />,
      containerElement: <div style={{ height: `200px` }} />,
      mapElement: <div style={{ height: `200px` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )(() => {
    return <GoogleMap defaultZoom={7} defaultCenter={{ lat: 51.1659867, lng: 4.9160106 }} options={{ streetViewControl: false, disableDefaultUI: false, draggable: false, gestureHandling: "none" }}><TrafficLayer autoUpdate /></GoogleMap>
})

class Traffic extends Component {
    constructor(props) {
        super(props)

        this.state = { trafficInfo: [],  map: <Map key={0}/>, c: 0 } 

        this.loadTrafficInfo = this.loadTrafficInfo.bind(this)    
    }

    componentDidMount() {
        this.loadTrafficInfo()
    }

    loadTrafficInfo() {
        getTraffic().then(this.onTrafficInfo.bind(this))
    }

    onTrafficInfo(res) {
        this.setState({ trafficInfo: res.data, c: this.state.c + 1 })
        console.log("MOUNT",this.state.c)
        this.setState({ map: <Map key={this.state.c}/>, c: this.state.c + 1 })
    }

    render(){
      return <Row>
          <Col s={6}>{this.state.map}</Col>
          <Col s={6}>{this.state.trafficInfo.map((i,j) => <Row key={j}><p>{i.title}</p></Row>)}</Col>
      </Row>
    }
}

export default Traffic
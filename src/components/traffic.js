import React, { Component } from 'react';
import { GoogleMap, TrafficLayer, withScriptjs, withGoogleMap } from "react-google-maps"
import { compose, withProps } from 'recompose';

export default compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `200px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )(() => {
    return <GoogleMap defaultZoom={7} defaultCenter={{ lat: 50.9987874, lng: 4.5931008 }} options={{ streetViewControl: false, disableDefaultUI: true }}><TrafficLayer autoUpdate /></GoogleMap>
})
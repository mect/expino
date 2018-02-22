import React from 'react';
import { Row } from 'react-materialize'
import '../css/grafana.css'

export default (props) => {
    return <Row>
        <h1>{props.title}</h1>
        <iframe title="grafana" width="100%" className="grafana-iframe" seamless='seamless' frameBorder="0" scrolling="no" src={props.src}/>
    </Row>
}
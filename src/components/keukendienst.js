import React, { Component } from 'react';
import { Table } from 'react-materialize';
import { getKeukendienst } from '../apis/keukendienst_api';
import '../css/keukendienst.css';

class Keukendienst extends Component {
    constructor(props) {
        super(props)

        this.state = { keukendienst: null }
        getKeukendienst().then(this.onKeukenDienst.bind(this))
    }

    onKeukenDienst(res) {
        this.setState({ keukendienst: res.data })
    }

    render() {
        if (!this.state.keukendienst) {
            return <div/>
        }
        const names = this.state.keukendienst.names.map((name, i) => <h2 key={i} className="keukendienst-naam">{name}</h2>)
        
        return <div>
            <h1>Keukendienst deze week</h1>
            {names}
        </div>
    }
}

export default Keukendienst
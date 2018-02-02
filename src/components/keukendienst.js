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

        const days = this.state.keukendienst.days.map((i,j) => <th key={j} className="keukendienst-colheader">{i}</th>)
        const rows = this.state.keukendienst.tasks.map((task, i) => <tr key={i}><th className="keukendienst-rowheader">{task}</th>{this.state.keukendienst.days.map((day, j) => <td className="keukendienst-item">{(this.state.keukendienst.content[day] || {})[task]}</td>)}</tr>)
        return <div>
        <h1>Keukendienst deze week</h1>
        <Table>
            <thead>
                <tr>
                    <th/>
                    {days}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
        </div>
    }
}

export default Keukendienst
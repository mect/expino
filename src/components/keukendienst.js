import React, { Component } from 'react';
import { Table } from 'react-materialize'
import { getKeukendienst } from '../apis/keukendienst_api'

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

        const days = this.state.keukendienst.days.map((i,j) => <th key={j}>{i}</th>)
        const rows = this.state.keukendienst.tasks.map((task, i) => <tr key={i}><th>{task}</th>{this.state.keukendienst.days.map((day, j) => <td>{(this.state.keukendienst.content[day] || {})[task]}</td>)}</tr>)
        return <div>
        <h1>Keuken dienst</h1>
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
import React, { Component } from 'react';

class NewsItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <h1>{this.props.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
        </div>
    }
}


export default NewsItem
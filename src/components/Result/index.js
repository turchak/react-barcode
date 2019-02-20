import React, { Component } from 'react';

class Result extends Component {
    render() {
        const { code } = this.props;
        return <div>{code}</div>
    }
}

export default Result;
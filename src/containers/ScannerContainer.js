import React, { Component, Fragment } from 'react';
import Scanner from '../components/Scanner';

class ScannerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScanning: false,
        };
    }
    render() {
        return (
            <Fragment>
                <Scanner />
            </Fragment>    
        )
    }
}

export default ScannerContainer;
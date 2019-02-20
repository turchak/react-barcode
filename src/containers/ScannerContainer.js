import React, { Component, Fragment } from 'react';
import Scanner from '../components/Scanner';
import Result from '../components/Result';

class ScannerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScanning: false,
            code: null,
        };
    }

    handleClick = ev => {
        const { isScanning } = this.state;
        this.setState({
            isScanning: !isScanning
        })
    }

    getCode = result => {
        console.log(result.codeResult.code)
        this.setState({
            code: result.codeResult.code,
            isScanning: false,
        })
    }

    render() {
        const  { isScanning, code } = this.state;
        return (
            <Fragment>
                <button type="button" onClick={this.handleClick}>{ isScanning ? 'Stop' : 'Scan' }</button>
                { code ? <Result code={code} /> : null }
                { isScanning ? <Scanner getCode={this.getCode} /> : null }
            </Fragment>    
        )
    }
}

export default ScannerContainer;
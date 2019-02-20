import React, { Component } from 'react';
import Quagga from 'quagga';

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream) => {
            alert('ready')
            Quagga.init({
                inputStream : {
                  name : "Live",
                  type : "LiveStream",
                  width: {min: 640},
                  height: {min: 480},
                  aspectRatio: {min: 1, max: 2},
                  target:this.videoRef.current
                },
                decoder : {
                  readers : ["ean_8_reader"]
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
                numOfWorkers: 2,
                frequency: 10,
                locate: true
              }, err => {
                  if (err) {
                      console.log(err);
                      return
                  }
                  console.log("Initialization finished. Ready to start");
                  Quagga.start();
              });

              Quagga.onDetected(result => this.detected(result))
                  Quagga.onProcessed(result => {
                    const drawingCtx = Quagga.canvas.ctx.overlay,
                        drawingCanvas = Quagga.canvas.dom.overlay;
            
                    if (result) {
                        if (result.boxes) {
                            drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                            result.boxes.filter(function (box) {
                                return box !== result.box;
                            }).forEach(function (box) {
                                Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                            });
                        }
            
                        if (result.box) {
                            Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                        }
            
                        if (result.codeResult && result.codeResult.code) {
                            Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                        }
                    }
                });
        })
    }

    componentWillUnmount() {
        Quagga.offDetected(this.detected);
    }

    detected = result => {
        const { getCode } = this.props;
        getCode(result);
        Quagga.stop()
    }

    render() {
        return <div id="scanner" ref={this.videoRef} />
    }
}

export default Scanner;
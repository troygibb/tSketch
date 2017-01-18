import React from 'react';
import { connect } from 'react-redux';
import { changeAtramentOption } from './actions';
import InputRange from 'react-input-range';
import { HuePicker } from 'react-color';
// import reactInputRangeStyling from '../node_modules/react-input-range/scss/InputRange.scss'

class AtramentOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreenMode: false,
    }
    this.changeMode = this.changeMode.bind(this);
    this.changeSmooth = this.changeSmooth.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }
  changeMode(event) {
    this.props.changeAtramentOption('mode', event.target.value);
  }
  changeSmooth() {
    const { atrament } = this.props;
    const newSmoothing = !atrament.smoothing;
    this.props.changeAtramentOption('smoothing', newSmoothing);
  }
  changeWidth(event) {
    const newWeight = Number(event.target.value);
    this.props.changeAtramentOption('weight', newWeight);
  }
  clearCanvas() {
    this.props.changeAtramentOption('clearing', true);
  }
  changeColor(color) {
    this.props.changeAtramentOption('color', color.hex);
  }
  toggleFullScreen() {
    var canvas = document.getElementById("draw");
    if (!this.state.fullScreenMode) {
      if (canvas.requestFullScreen) {
        canvas.requestFullScreen();
      } else if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
      } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
      }
    } else {
      if (canvas.requestFullScreen) {
        document.requestFullScreen();
      } else if (canvas.webkitRequestFullScreen) {
        document.webkitExitFullscreen();
      } else if (canvas.mozRequestFullScreen) {
        document.mozRequestFullScreen();
      }
    }
    this.setState({
      fullScreenMode: !this.state.fullScreenMode
    })
  }
  render() {
    const { atramentOptions } = this.props;
    return (
      <div id="atramentOptions">
        <form id="options">
          <HuePicker
            id="colorPicker"
            color={ atramentOptions.color }
            onChange={ this.changeColor }
          />
          <span>Mode:</span>
          <select onChange={this.changeMode}>
            <option value="draw">Draw</option>
            <option value="fill">Fill</option>
            <option value="erase">Erase</option>
          </select>
          
          <span>Smoothing:</span>
          <input
            onChange={this.changeSmooth}
            type="checkbox"
            name="cbox1"
            checked={atramentOptions.smoothing}
          />
          
          <span>Stroke width:</span>
          <input 
            type="range"
            min="1"
            max="40"
            value= {this.props.atramentOptions.weight}
            onChange={this.changeWidth}
          />
          <button onClick={this.clearCanvas}>Clear</button>
          <a href="#" onClick={this.toggleFullScreen}>
            { this.state.fullScreenMode ? 'Exit FullScreen' : 'Go FullScreen'}
          </a>
        </form>
      </div>
    );
  }
}
//

const mapStateToProps = (state) => {
  return { atramentOptions: state.atramentOptions };
};

/*

<InputRange
            minValue={0}
            maxValue={20}
            value= {this.props.atramentOptions.weight}
            onChange={this.changeWidth}
          />
*/

export default connect(mapStateToProps, { changeAtramentOption })(AtramentOptions);

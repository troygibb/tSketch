import React from 'react';
import { connect } from 'react-redux';
import AT from 'atrament';

import { changeAtramentOption } from './actions';

class AtramentOptions extends React.Component {
  constructor(props) {
    super(props);
    this.changeMode = this.changeMode.bind(this);
    this.changeSmooth = this.changeSmooth.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
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
    console.log(event);
    this.props.changeAtramentOption('weight', newWeight);
  }
  clearCanvas() {
    this.props.changeAtramentOption('clearing', true);
  }
  render() {
    const { atrament } = this.props;
    return (
      <div>
        <form id="form">
          <select onChange={this.changeMode}>
            <option value="draw">Draw</option>
            <option value="fill">Fill</option>
            <option value="erase">Erase</option>
          </select>
          <br/>
          Smoothing?
          <input
            onChange={this.changeSmooth}
            type="checkbox"
            name="cbox1"
            checked={atrament.smoothing}
          />
          <br/>
          Stroke width:
          <input type="text" onChange={this.changeWidth}/>
          <br/>
          <button onClick={this.clearCanvas}>Clear</button>
        </form>
      </div>
    );
  }
}
//

const mapStateToProps = (state) => {
  return { atrament: state.atrament };
};

export default connect(mapStateToProps, { changeAtramentOption })(AtramentOptions);

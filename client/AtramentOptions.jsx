import React from 'react';
import { connect } from 'react-redux';
import { changeAtramentOption } from './actions';

class AtramentOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    }
    this.changeMode = this.changeMode.bind(this);
    this.changeSmooth = this.changeSmooth.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
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
  changeColor(event) {
    this.props.changeAtramentOption('color', event.target.value);
  }
  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    const { atramentOptions } = this.props;
    return (
      <div id="atramentOptions">
        <a id="collapseToggle" onClick= { this.toggleCollapsed } data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          <span style= {{ 'fontize': this.state.collapsed ? '1.5em' : '1em' }}>
            { this.state.collapsed ? 'Show Tools' : 'Hide Tools' }
          </span>
        </a>
        <div id="options" className="collapse" id="collapseExample">
          <span>Color:</span>
          <input type="color" onChange={this.changeColor} />
          <br />
          <span>Mode:</span>
          <select onChange={this.changeMode}>
            <option value="draw">Draw</option>
            <option value="fill">Fill</option>
            <option value="erase">Erase</option>
          </select>
          <br/>
          <span>Smoothing:</span>
          <input
            onChange={this.changeSmooth}
            type="checkbox"
            name="cbox1"
            checked={atramentOptions.smoothing}
          />
          <br/>
          <span>Stroke width:</span>
          <input type="text" id="weightField" onChange={this.changeWidth}/>
          <br/>
          <button onClick={this.clearCanvas}>Clear</button>
        </div>
      </div>
    );
  }
}
//

const mapStateToProps = (state) => {
  return { atramentOptions: state.atramentOptions };
};

export default connect(mapStateToProps, { changeAtramentOption })(AtramentOptions);

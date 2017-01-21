import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AT from './lib/atrament';

import { assignAtrament, changeAtramentOption, savePostcardImage } from './actions/index';
import AtramentOptions from './AtramentOptions';

class Draw extends React.Component {
  constructor(props) {
    super(props);
    this.saveImage = this.saveImage.bind(this);
  }
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  componentDidMount() {
    this.atrament = AT('#mySketcher', 1275, 1875, 'black', this.props.backgroundImage);
    _.extend(this.atrament, this.props.atramentOptions);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.atramentOptions.clearing) {
      this.atrament = AT('#mySketcher', 1275, 1875, 'black', this.props.backgroundImage);
      this.props.changeAtramentOption('clearing', false);
      return;
    }
    if (nextProps.atramentOptions.undoing) {
      this.atrament.undo();
      this.props.changeAtramentOption('undoing', false);
      return;
    }
    _.extend(this.atrament, nextProps.atramentOptions);
  }
  saveImage() {
    const imageData = this.atrament.toImage();
    this.props.savePostcardImage(imageData);
  }
  render() {
    return (
      <div className="container bodyWrapper" >
        <h3 className="sidelines text-center">
          <span>Tap or Click To Draw</span>
        </h3>
        <div className="row" id="draw">
          <div className="col-md-8">
            <canvas id="mySketcher"/>
          </div>
          <div className="col-md-4 text-left">
            <AtramentOptions />
            <Link to="/message">
              <button onClick={this.saveImage} className="btn btn-lrg btn-success pull-right">Save & Next</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    atramentOptions: state.atramentOptions,
    backgroundImage: state.backgroundImage,
  };
};

export default connect(mapStateToProps, {
  assignAtrament,
  changeAtramentOption,
  savePostcardImage,
})(Draw);

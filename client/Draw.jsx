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
  componentDidMount() {
    this.atrament = AT('#mySketcher', 1275, 1875, 'black');
    _.extend(this.atrament, this.props.atramentOptions);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.atramentOptions.clearing) {
      this.atrament.clear();
      this.props.changeAtramentOption('clearing', false);
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
      <div>
        <div id="draw">
          <AtramentOptions />
          <canvas id="mySketcher" />
        </div>
        <Link to="/message">
          <button onClick={this.saveImage} className="nextButton">Next</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    atramentOptions: state.atramentOptions,
  };
};

export default connect(mapStateToProps, {
  assignAtrament,
  changeAtramentOption,
  savePostcardImage,
})(Draw);

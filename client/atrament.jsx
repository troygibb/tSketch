import React from 'react';
import { connect } from 'react-redux';
import AT from 'atrament';
import _ from 'lodash';

import { assignAtrament, changeAtramentOption } from './actions/index';
import AtramentOptions from './atramentOptions';

class Atrament extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.atrament = new AT('#mySketcher');
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
  render() {
    return (
      <div>
        { Object.keys(this.props.atramentOptions).length ? <AtramentOptions /> : false }
        <canvas id="mySketcher" width="500px" height="500px"></canvas>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    atramentOptions: state.atramentOptions,
  };
};

export default connect(mapStateToProps, { assignAtrament, changeAtramentOption })(Atrament)

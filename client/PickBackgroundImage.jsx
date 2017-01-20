import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { changeBackgroundImage } from './actions';

class PickBackgroundImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button onClick={() => this.props.changeBackgroundImage(require('./styles/images/blahDonald.jpg'))}>Blah Donald</button>
        <button onClick={() => this.props.changeBackgroundImage(require('./styles/images/butterDonald.jpg'))}>Butter Donald</button>
        <button onClick={() => this.props.changeBackgroundImage(require('./styles/images/donaldAngry.jpg'))}>Donald Angry</button>
        <button onClick={() => this.props.changeBackgroundImage(require('./styles/images/fatherDonald.jpg'))}>Father Donald</button>
        <Link to="/draw">
          Next
        </Link>
      </div>
    );
  }
}


export default connect(null, { changeBackgroundImage })(PickBackgroundImage);

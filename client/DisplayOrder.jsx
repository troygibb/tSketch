import React from 'react';
import { connect } from 'react-redux';

class DisplayOrder extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { message, postcardImage } = this.props;
    return (
      <div>
        <img
          alt="Your Doodle"
          width="500px" src={postcardImage}
        />
        <div>
          {message}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (currentState) => {
  return {
    postcardImage: currentState.postcardImage,
    message: currentState.message,
  };
};

export default connect(mapStateToProps, {})(DisplayOrder);

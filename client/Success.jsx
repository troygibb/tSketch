import React from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';

class Success extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { orderResponse } = this.props;
    return (
      <div className="container success">
        <h1>Success!</h1>
        <p>
          Your Doodle should arrive to The White House on {orderResponse.expectedDeliveryDate}.
          {(orderResponse.additionalAddress) ? 'A copy will also be sent to you and should arrive shortly after.' : ''}
        </p>
        <div className="row">
          <div className="col-md-6">
            <div>
              <img
                alt="Your Postcard"
                src={orderResponse.postcardImage.secure_url}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              {orderResponse.message}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orderResponse: state.orderResponse,
  };
};
export default connect(mapStateToProps)(Success);

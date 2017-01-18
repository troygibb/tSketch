import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import { completeOrder } from './actions/index';

class ProcessOrder extends React.Component {
  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
  }
  onToken(response) {
    const email = response.email;
    const stripeToken = response.id;
    const postcardImage = this.props.postcardImage;
    const message = this.props.message;
    this.props.completeOrder({
      email,
      stripeToken,
      postcardImage,
      message,
    });
  }
  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey={ STRIPE_PUBLIC_KEY }
      >
        <button className="nextButton">Place your order!</button>
      </StripeCheckout>
    )
  }
}
const mapStateToProps = (currentState) => {
  return {
    message: currentState.message,
    postcardImage: currentState.postcardImage,
  };
};
export default connect(mapStateToProps, { completeOrder })(ProcessOrder);

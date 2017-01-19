import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import { completeOrder, verifyAddress } from './actions/index';

class ProcessOrder extends React.Component {
  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
    this.renderVerifyAddressButton = this.renderVerifyAddressButton.bind(this);
    this.renderPayButton = this.renderPayButton.bind(this);
    this.verifyAddress = this.verifyAddress.bind(this);
  }
  onToken(response) {
    const email = response.email;
    const stripeToken = response.id;
    const postcardImage = this.props.postcardImage;
    const message = this.props.message;
    const additionalAddress = this.props.additionalAddress;
    const showAdditionalAddress = this.props.showAdditionalAddress;
    this.props.completeOrder({
      additionalAddress: showAdditionalAddress ? additionalAddress : {},
      email,
      stripeToken,
      postcardImage,
      message,
    });
  }
  verifyAddress() {
    const { additionalAddress } = this.props;
    const addressData = {
      name: additionalAddress.name,
      address_line1: additionalAddress.address_line1,
      address_line2: additionalAddress.address_line2,
      address_city: additionalAddress.address_city,
      address_state: additionalAddress.address_state,
      address_zip: additionalAddress.address_zip,
    };
    this.props.verifyAddress(addressData);
  }
  renderVerifyAddressButton() {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={this.verifyAddress}
        >
          Verify Additional Address
        </button>
      </div>
    );
  }
  renderLoadingButton() {
    return (
      <div>
        <button className="btn btn-primary">
          Currently checking to make sure we can deliver to your address too...
        </button>
      </div>
    );
  }
  renderPayButton() {
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey={STRIPE_PUBLIC_KEY}
        >
          <button className="nextButton">Place your order!</button>
        </StripeCheckout>
        {(this.props.additionalAddress.warningMessage) ?
          (<p>{this.props.additionalAddress.warningMessage}</p>) : null
        }
      </div>
    );
  }
  render() {
    const { showAdditionalAddress, additionalAddress } = this.props;
    if (showAdditionalAddress && !additionalAddress.verified) {
      // Requesting a second postcard but the user hasn't verified their address yet
      return this.renderVerifyAddressButton();
    } else if (showAdditionalAddress && additionalAddress.loading) {
      // Currently verifying address
      return this.renderLoadingButton();
    }
    return this.renderPayButton();
  }
}
const mapStateToProps = (currentState) => {
  return {
    message: currentState.message,
    postcardImage: currentState.postcardImage,
    additionalAddress: currentState.additionalAddress,
    showAdditionalAddress: currentState.showAdditionalAddress,
  };
};
export default connect(mapStateToProps, { completeOrder, verifyAddress })(ProcessOrder);

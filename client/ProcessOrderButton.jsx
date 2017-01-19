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
    const address = this.props.address;
    const showAddress = this.props.showAddress;
    const addressName = this.props.addressName;
    const addressData = {
      ...address,
      name: addressName || 'Doodler', // Add default name because Lob will throw an error on send but not on address validation if a name isn't provided
    };
    this.props.completeOrder({
      additionalAddress: (showAddress) ? addressData : {},
      email,
      stripeToken,
      postcardImage,
      message,
    });
  }
  verifyAddress() {
    const { address } = this.props;
    this.props.verifyAddress(address);
  }
  renderVerifyAddressButton() {
    return (
      <div>
        <button
          className="btn btn-block btn-default"
          onClick={this.verifyAddress}
        >
          Verify Your Address
        </button>
      </div>
    );
  }
  renderLoadingButton() {
    return (
      <div>
        <button className="btn btn-block btn-default" disabled>
          Verifying Address...
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
          amount={this.props.amount}
        >
          <button className="btn btn-block btn-primary">Send Your Doodle!</button>
        </StripeCheckout>
        {(this.props.addressWarning) ?
          (<p>{this.props.addressWarning}</p>) : null
        }
      </div>
    );
  }
  render() {
    const { showAddress, addressVerified, addressLoading } = this.props;
    if (showAddress && addressLoading) {
      // Currently verifying address
      return this.renderLoadingButton();
    } else if (showAddress && !addressVerified) {
      // Requesting a second postcard but the user hasn't verified their address yet
      return this.renderVerifyAddressButton();
    }
    return this.renderPayButton();
  }
}
const mapStateToProps = (currentState) => {
  return {
    message: currentState.message,
    postcardImage: currentState.postcardImage,
    address: currentState.address,
    addressName: currentState.addressName,
    showAddress: currentState.showAddress,
    addressVerified: currentState.addressVerified,
    addressLoading: currentState.addressLoading,
    addressWarning: currentState.addressWarning,
  };
};
export default connect(mapStateToProps, { completeOrder, verifyAddress })(ProcessOrder);

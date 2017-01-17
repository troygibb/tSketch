import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

import PostMessage from './postMessage';

export default class GetMoney extends React.Component {
  constructor(props) {
    super(props);
  }
  onToken(token) {
    fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }
  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey={ STRIPE_PUBLIC_KEY }
      > 
      <PostMessage />
      </StripeCheckout>
    )
  }
}
import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import { postImageMessage } from './actions/index';

class PostMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: { includeWatermark: true, scaleDownRetina: true }
		};
		this.sendMessage = this.sendMessage.bind(this);

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
	sendMessage() {
		const postcardImage = this.props.lc.getImage().toDataURL('image/png');
		const { message } = this.props;
		this.props.postImageMessage({ postcardImage, message });
	}
	render() {
		return (
			<StripeCheckout token={this.onToken} stripeKey={ STRIPE_PUBLIC_KEY }> 
				<button onClick={ this.sendMessage } id="save-image" className="btn-default">Finalize Postcard!</button>
			</StripeCheckout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		lc: state.lc,
		message: state.message,
	};
};

export default connect(mapStateToProps, { postImageMessage })(PostMessage)
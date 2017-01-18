import React from 'react';
import { connect } from 'react-redux';

import StateSelector from './StateSelector';
import { changeAddress } from './actions';

class AdditionalAddress extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAdditionalAddress: false,
		}
		this.changeAddress = this.changeAddress.bind(this);
		this.showAdditionalAddress = this.showAdditionalAddress.bind(this);
	}
	changeAddress(event) {
		// Validating zipcode for 5-digits.
		if (event.target.name === 'zipcode') {
			if (/^\d{1,5}$/.test(event.target.value)) {
				this.props.changeAddress(event.target.name, event.target.value);
			}
		} else {
			this.props.changeAddress(event.target.name, event.target.value);
		}
	}
	showAdditionalAddress(event) {
		this.setState({
			showAdditionalAddress: event.target.checked
		})
	}
	render() {
		const { recipient, address1, address2, city, zipcode } = this.props;
		return (
			<div>
				<span>Add additional address?</span><input onClick={this.showAdditionalAddress} type="checkbox" />
				{	this.state.showAdditionalAddress ?
					<div id="additional-address-field">
						<input value={recipient} onChange={this.changeAddress} name="recipient" placeholder="Recipient" type="text" />
						<input value={address1} onChange={this.changeAddress} name="address1" placeholder="Address Line 1" type="text" />
						<input value={address2} onChange={this.changeAddress} name="address2" placeholder="Address Line 2" type="text" />
						<input value={city} onChange={this.changeAddress} name="city" placeholder="City" type="text" />
						<span>Select state:</span><StateSelector />
						<input value={zipcode} onChange={this.changeAddress} name="zipcode" placeholder="Zipcode" type="text" />
						<span>*Currently only allowing addresses within the United States</span>
					</div>
					: false
				}
			</div>
		)
	}
}

const mapStateToProps = (currentState) => {
	const { recipient, address1, address2, city, zipcode } = currentState.additionalAddress;
  return {
  	recipient,
  	address1, 
  	address2, 
  	city, 
  	zipcode,
  };
};

export default connect(mapStateToProps, { changeAddress })(AdditionalAddress);

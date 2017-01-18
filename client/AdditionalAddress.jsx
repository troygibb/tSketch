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
		if (event.target.name === 'address_zip') {
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
		const { name, address_line1, address_line2, address_city, address_zip } = this.props;
		return (
			<div>
				<span>Add additional address?</span><input onClick={this.showAdditionalAddress} type="checkbox" />
				{	this.state.showAdditionalAddress ?
					<div id="additional-address-field">
						<input value={name} onChange={this.changeAddress} name="name" placeholder="name" type="text" />
						<input value={address_line1} onChange={this.changeAddress} name="address_line1" placeholder="Address Line 1" type="text" />
						<input value={address_line2} onChange={this.changeAddress} name="address_line2" placeholder="Address Line 2" type="text" />
						<input value={address_city} onChange={this.changeAddress} name="address_city" placeholder="City" type="text" />
						<span>Select state:</span><StateSelector />
						<input value={address_zip} onChange={this.changeAddress} name="address_zip" placeholder="Zipcode" type="text" />
						<span>*Currently only allowing addresses within the United States</span>
					</div>
					: false
				}
			</div>
		)
	}
}

/*
name: '',
    address_line1: '',
    address_line2: '',
    address_city: '',
    address_state: '',
    address_zip: '',

*/

const mapStateToProps = (currentState) => {
	const { name, address_line1, address_line2, address_city, address_zip } = currentState.additionalAddress;
  return {
  	name,
  	address_line1, 
  	address_line2, 
  	address_city, 
  	address_zip,
  };
};

export default connect(mapStateToProps, { changeAddress })(AdditionalAddress);

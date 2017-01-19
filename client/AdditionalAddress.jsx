import React from 'react';
import { connect } from 'react-redux';
// import Spinner from 'react-spinkit';
import StateSelector from './StateSelector';
import { changeAddress, toggleAdditionalAddress } from './actions';

class AdditionalAddress extends React.Component {
  constructor(props) {
    super(props);
    this.changeAddress = this.changeAddress.bind(this);
    this.toggleAdditionalAddress = this.toggleAdditionalAddress.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }
  changeAddress(event) {
    if (event.target.name === 'address_zip') {
      // Validating zipcode for 5-digits. Ignore change event if it doesn't pass regex
      if (/^\d{1,5}$/.test(event.target.value)) {
        this.props.changeAddress(event.target.name, event.target.value);
      }
    } else {
      this.props.changeAddress(event.target.name, event.target.value);
    }
  }
  toggleAdditionalAddress() {
    this.props.toggleAdditionalAddress(!this.props.showAdditionalAddress);
  }
  renderLoading() {
    return (
      <div>
        {/* <Spinner spinnerName="double-bounce"/> */}
        Loading Indicator Here
        Verifying Address
      </div>
    );
  }
  renderForm() {
    const { name,
      address_line1,
      address_line2,
      address_city,
      address_zip,
      showAdditionalAddress,
    } = this.props;
    return (
      <div>
        <div className="checkbox">
          <label htmlFor="additionalAddressCheckbox">
            <input
              id="additionalAddressCheckbox"
              onClick={this.toggleAdditionalAddress}
              type="checkbox"
            /> Send yourself a copy too?
          </label>
        </div>
        {showAdditionalAddress ?
          <div id="additional-address-field">
            <form>
              <div className="form-group">
                <input
                  value={name}
                  onChange={this.changeAddress}
                  name="name"
                  placeholder="name"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  value={address_line1}
                  onChange={this.changeAddress}
                  name="address_line1"
                  placeholder="Address Line 1"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  value={address_line2}
                  onChange={this.changeAddress}
                  name="address_line2"
                  placeholder="Address Line 2"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  value={address_city}
                  onChange={this.changeAddress}
                  name="address_city"
                  placeholder="City"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <span>Select state:</span>
                <StateSelector />
              </div>
              <div className="form-group">
                <input
                  value={address_zip}
                  onChange={this.changeAddress}
                  name="address_zip"
                  placeholder="Zipcode"
                  type="text"
                  className="form-control"
                />
              </div>
              <span>*Currently only allowing addresses within the United States</span>
            </form>
          </div>
          : false
        }
      </div>
    );
  }
  render() {
    const { loading } = this.props;
    if (loading) {
      return this.renderLoading();
    }
    return this.renderForm();
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
  const {
    name,
    address_line1,
    address_line2,
    address_city,
    address_zip,
    loading,
  } = currentState.additionalAddress;
  return {
    name,
    address_line1,
    address_line2,
    address_city,
    address_zip,
    loading,
    showAdditionalAddress: currentState.showAdditionalAddress,
  };
};

export default connect(mapStateToProps, {
  changeAddress, toggleAdditionalAddress,
})(AdditionalAddress);

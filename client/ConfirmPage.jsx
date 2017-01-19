import React from 'react';
import { connect } from 'react-redux';

import AdditionalAddress from './AdditionalAddress';
import ProcessOrderButton from './ProcessOrderButton';
import Loading from './Loading';

class ConfirmPage extends React.Component {
  constructor(props) {
    super(props);
  }
  renderConfirmation() {
    let amount = 200; // $2.00 in cents
    if (this.props.showAddress) {
      amount *= 2;
    }
    return (
      <div className="container confirm">
        <div className="row">
          <div className="col-md-6 confirm___doodlePreviewWrapper">
            <img
              alt="Your Doodle"
              src={this.props.postcardImage}
              className="confirm___doodlePreview"
            />
          </div>
          <div className="col-md-6">
            <div>
              <h3 className="sidelines text-center">
                <span>Postcard Message</span>
              </h3>
              <blockquote>
                <p>{this.props.message}</p>
              </blockquote>
              <hr />
            </div>
            <AdditionalAddress />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <ProcessOrderButton
              amount={amount}
            />
          </div>
        </div>
      </div>
    );
  }
  renderLoading() {
    return <Loading text="Printing Your Postcards" />;
  }
  render() {
    return (
      <div className="container">
        {(this.props.orderLoading) ?
          this.renderLoading() :
          this.renderConfirmation()}
      </div>
    );
  }
}
const mapStateToProps = (currentState) => {
  return {
    orderLoading: currentState.orderLoading,
    postcardImage: currentState.postcardImage,
    message: currentState.message || 'To Mr. Trump:',
    showAddress: currentState.showAddress,
  };
};

export default connect(mapStateToProps)(ConfirmPage);

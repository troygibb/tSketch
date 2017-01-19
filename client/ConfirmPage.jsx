import React from 'react';
import { connect } from 'react-redux';

import DisplayOrder from './DisplayOrder';
import AdditionalAddress from './AdditionalAddress';
import ProcessOrder from './ProcessOrder';
import Loading from './Loading';

class ConfirmPage extends React.Component {
  constructor(props) {
    super(props);
  }
  renderConfirmation() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <DisplayOrder />
          </div>
          <div className="col-md-6">
            <AdditionalAddress />
          </div>
        </div>
        <ProcessOrder />
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
  };
};

export default connect(mapStateToProps)(ConfirmPage);

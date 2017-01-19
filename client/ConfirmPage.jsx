import React from 'react';

import DisplayOrder from './DisplayOrder';
import AdditionalAddress from './AdditionalAddress';
import ProcessOrder from './ProcessOrder';

class ConfirmPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
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
}

export default ConfirmPage;

// const mapStateToProps = (currentState) => {
//   return {
//     addressState: currentState.additionalAddress.state
//   };
// };

// export default connect(mapStateToProps, { changeAddress })(StateSelector);

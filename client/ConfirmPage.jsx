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
			<div>
				<DisplayOrder />
				<AdditionalAddress />
				<ProcessOrder />
			</div>
		)
	}
}

export default ConfirmPage;

// const mapStateToProps = (currentState) => {
//   return {
//     addressState: currentState.additionalAddress.state
//   };
// };

// export default connect(mapStateToProps, { changeAddress })(StateSelector);
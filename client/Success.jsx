import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Success extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id='home'>
				<h1>Success!</h1>
				<p>
          Your Doodle should arrive on {this.props.expectedDeliveryDate}.
				</p>
        <div className="row">
          <div className="col-md-6">
            <img src={this.props.frontThumbnail} />
          </div>
          <div className="col-md-6">
            <img src={this.props.backThumbnail} />
          </div>
        </div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return state.orderResponse;
};
export default connect(mapStateToProps)(Success);

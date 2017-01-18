import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { changeMessage } from './actions/index';

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.changeMessage = this.changeMessage.bind(this);
	}
	changeMessage(event) {
		const newText = event.target.value;
		// TODO: Check to make sure equal or less than 355
		if (newText.length <= 355) {
			this.props.changeMessage(newText);
		}
	}
	render() {
		const { message } = this.props;
		return (
			<div  className="bodyWrapper container" id="message">
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<h2>Write Your Message</h2>
						<textarea className="message__field"  id="message-input" value={ message } onChange={this.changeMessage} placeholder="Dear Mr. Trump..."/>
						<div>{ 355 - message.length } Characters Left</div>
						<Link to="/confirm">
							<button className="btn btn-lg btn-success btn-block">Next</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		message: state.message,
	};
};

export default connect(mapStateToProps, { changeMessage })(Message)

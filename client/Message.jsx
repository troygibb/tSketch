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
			<div id="message">				
				<textarea id="message-input" value={ message } onChange={this.changeMessage} placeholder="Dear Mr. Trump..."/>
				<div>{ 355 - message.length } Characters Left</div>
				<Link to="/confirm">
					<button className="nextButton">Next</button>
				</Link>
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

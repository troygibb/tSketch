import React from 'react';
import { connect } from 'react-redux';

import { changeMessage } from './actions/index';

import ProcessOrder from './ProcessOrder';

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.changeMessage = this.changeMessage.bind(this);
	}
	changeMessage(event) {
		const newText = event.target.value;
		console.log(newText.length);
		if (newText.length > 355) {
			// dispatch action to change store value 'overCharacterLimit' to true
		} else {
			this.props.changeMessage(newText);
		}
	}
	render() {
		const { message } = this.props; 
		return (
			<div id="message">				
				<textarea id="message-input" value={ message } onChange={this.changeMessage} placeholder="Dear Mr. Trump..."/>
				<div>355 Character Limit</div>
				<ProcessOrder />
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

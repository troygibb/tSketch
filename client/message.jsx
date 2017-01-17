import React from 'react';
import { connect } from 'react-redux';

import { changeMessage } from './actions/index';

import GetMoney from './getMoney';

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.changeMessage = this.changeMessage.bind(this);
	}
	changeMessage(event) {
		const newText = event.target.value
		this.props.changeMessage(newText);
	}
	render() {
		const { message } = this.props; 
		return (
			<div id='message'>
				<input id='message-input' type="text" value={ message } onChange={this.changeMessage} />
				<div>355 Character Limit</div>
				<GetMoney />
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

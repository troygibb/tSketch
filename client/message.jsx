import React from 'react';
import { connect } from 'react-redux';

import { changeMessage } from './actions/index';

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
		return <input type="text" value={ message } onChange={this.changeMessage} />;
	}
}

const mapStateToProps = (state) => {
	return {
		message: state.message,
	};
};

export default connect(mapStateToProps, { changeMessage })(Message)

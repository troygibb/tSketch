import React from 'react';
import LC from 'literallycanvas';
import { connect } from 'react-redux';

import { postImageMessage } from './actions/index';

class PostMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: { includeWatermark: true, scaleDownRetina: true }
		};
		this.sendMessage = this.sendMessage.bind(this);

	}
	sendMessage() {
		const png = this.props.lc.getImage().toDataURL('image/png');
		const { message } = this.props;
		this.props.postImageMessage({ png, message });
	}
	render() {
		return <button onClick={ this.sendMessage } id="save-image" className="btn-primary btn-block">Send your thoughts to Trump!</button>;
	}
}

const mapStateToProps = (state) => {
	return {
		lc: state.lc,
		message: state.message,
	};
};

export default connect(mapStateToProps, { postImageMessage })(PostMessage)
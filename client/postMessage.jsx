import React from 'react';
import { connect } from 'react-redux';

import { postImageMessage } from './actions/index';
import TakeMoney from './getMoney';

class PostMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: { includeWatermark: true, scaleDownRetina: true }
		};
		this.sendMessage = this.sendMessage.bind(this);

	}
	sendMessage() {
		const postcardImage = this.props.lc.getImage().toDataURL('image/png');
		const { message } = this.props;
		this.props.postImageMessage({ postcardImage, message });
	}
	render() {
		return (
			<div>
				<button onClick={ this.sendMessage } id="save-image" className="btn-default">Finalize Postcard!</button>
				<TakeMoney />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		lc: state.lc,
		message: state.message,
	};
};

export default connect(mapStateToProps, { postImageMessage })(PostMessage)
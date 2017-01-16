import React from 'react';
import LC from 'literallycanvas';
import { connect } from 'react-redux';

import { postImage } from './actions/index';

class PostMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: { includeWatermark: true, scaleDownRetina: true }
		};
		this.getImage = this.getImage.bind(this);

	}
	getImage() {
		const png = this.props.lc.getImage().toDataURL('image/png');
		this.props.postImage({ png });
	}
	render() {
		return <h1 onClick={ this.getImage } id="save-image"> Save Image </h1>;
	}
}

const mapStateToProps = (state) => {
	return {
		lc: state.lc,
	};
};

export default connect(mapStateToProps, { postImage })(PostMessage)
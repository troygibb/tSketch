import React from 'react';
import LC from 'literallycanvas';
import { connect } from 'react-redux';

class SaveImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: { includeWatermark: true, scaleDownRetina: true }
		};
		this.getImage = this.getImage.bind(this);
	}
	getImage() {
		const savedImage = this.props.lc.getImage();
		console.log(savedImage);
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

export default connect(mapStateToProps, {})(SaveImage)
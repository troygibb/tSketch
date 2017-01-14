import React from 'react';
import { LiterallyCanvasReactComponent } from 'literallycanvas';
import { connect } from 'react-redux';

import SaveImage from './saveImage';
import { getLC } from './actions/index';

class Draw extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
  	return (
	  	<div>
	  		<SaveImage />
	  		<LiterallyCanvasReactComponent
	  			onInit = { 
	  				lc => {
	  					this.props.getLC(lc);
	  					console.log("initialized with", lc) 
	  				}
	  			}
	  			imageURLPrefix="../node_modules/literallycanvas/img" 
	  		/>
	  	</div>
  	);
  }
}

const mapStateToProps = (state) => {
	return {
		lc: state.lc,
	};
};

export default connect(mapStateToProps, { getLC })(Draw)

// 	  		<LC.LiterallyCanvasReactComponent imageURLPrefix="../node_modules/literallycanvas/img" />

import React from 'react';
import { LiterallyCanvasReactComponent } from 'literallycanvas';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { assignLC } from './actions/index';

class Draw extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
  	return (
	  	<div id='draw'>
	  		<LiterallyCanvasReactComponent
	  			onInit = { 
	  				lc => {
	  					//lc.opts.tools.splice(2, 3);
	  					this.props.assignLC(lc);
	  					console.log("initialized with", lc) 
	  				}
	  			}
	  			imageURLPrefix="../node_modules/literallycanvas/img" 
	  		/>
	  		<Link to='/message'>
					<button className='btn-default'>Next</button>
				</Link>
	  	</div>
  	);
  }
}

const mapStateToProps = (state) => {
	return {
		lc: state.lc,
	};
};

export default connect(mapStateToProps, { assignLC })(Draw)

// opts -> tools 
// 	  		<LC.LiterallyCanvasReactComponent imageURLPrefix="../node_modules/literallycanvas/img" />

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { assignLC } from './actions/index';
import Atrament from './atrament';

class Draw extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
  	return (
	  	<div id='draw'>
				<Atrament />
	  		<Link to='/message'>
					<button className='btn-default'>Next</button>
				</Link>
	  	</div>
  	);
  }
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { assignLC })(Draw)

// opts -> tools
// 	  		<LC.LiterallyCanvasReactComponent imageURLPrefix="../node_modules/literallycanvas/img" />

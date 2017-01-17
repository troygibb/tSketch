import React from 'react';
import { connect } from 'react-redux';
import AT from 'atrament';
import _ from 'lodash';

import { assignAtrament } from './actions/index';
import AtramentOptions from './atramentOptions';

class Atrament extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.atrament = new AT('#mySketcher');
		_.extend(this.atrament, this.props.atrament);
		// this.props.assignAtrament(a 	trament);
	}
	componentWillReceiveProps(nextProps) {
		_.extend(this.atrament, nextProps.atrament);
	}
	render() {
		return (
			<div>
				{ Object.keys(this.props.atrament).length ? <AtramentOptions /> : false }
				<canvas id="mySketcher" width="500px" height="500px"></canvas> 
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		atrament: state.atrament,
	};
};

export default connect(mapStateToProps, { assignAtrament })(Atrament)
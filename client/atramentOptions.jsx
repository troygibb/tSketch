import React from 'react';
import { connect } from 'react-redux';
import AT from 'atrament';

import { changeAtramentOption } from './actions';

class Atrament extends React.Component {
	constructor(props) {
		super(props);
		this.changeMode = this.changeMode.bind(this);
	}
	changeMode(event) {
		const { atrament } = this.props; 
		this.props.changeAtramentOption('mode', event.target.value)
	}
	render() {
		return (
			<form>	
				<select onChange={ this.changeMode }>
				  <option value="erase">Erase</option>
				  <option value="fill">Fill</option>
				  <option value="draw">Draw</option>
				</select>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		atrament: state.atrament,
	};
};

export default connect(mapStateToProps, { changeAtramentOption })(Atrament)
import React from 'react';

class MainContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<div id="navBar" >
					<a href="#">
		        DrawTrumpADoodle!
		      </a>
			  </div>
				{ this.props.children }
			</div>
		)
	}
}

export default MainContainer; 
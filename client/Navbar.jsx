import React from 'react';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<div id="navbar" >
					<a href="#">
		        DrawTrumpADoodle!
		      </a>
			  </div>
				{ this.props.children }
			</div>
		)
	}
}

export default Navbar; 
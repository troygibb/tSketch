import React from 'react';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<div id="navbar" >
					<div className='container'>
							<a href="#">
				        DrawTrumpADoodle!
				      </a>
					</div>
			  </div>
				{ this.props.children }
			</div>
		)
	}
}

export default Navbar;

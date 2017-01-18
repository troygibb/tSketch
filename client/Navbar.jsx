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
							<a className="logo" href="#">
				        DrawTrumpADoodle!
				      </a>
							<div className="checkoutProgress">
								<span className="checkoutProgress__label">Progress</span>
								<div className="progress">
								  <div className="progress-bar">
								    <span>20%</span>
								  </div>
								</div>
							</div>
					</div>
			  </div>
				{ this.props.children }
			</div>
		)
	}
}

export default Navbar;

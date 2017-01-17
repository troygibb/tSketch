import React from 'react';

class MainContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">
				    <div className="navbar-header">
				      <a className="navbar-brand" href="#">
				        DrawTrumpADoodle!
				      </a>
				    </div>
				  </div>
				</nav>
				{ this.props.children }
			</div>
		)
	}
}

export default MainContainer; 
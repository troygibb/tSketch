import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="navbar" >
        <div className="container">
          <Link to="/">
            <a className="logo">
              DrawTrumpADoodle!
            </a>
          </Link>
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
    );
  }
}

export default Navbar;

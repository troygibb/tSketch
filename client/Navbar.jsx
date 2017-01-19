import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header>
        <div className="navbar">
          <div className="navbar-header">
            <div className="container">
              <Link className="navbar-brand" to="/">
                <img src="/images/logo.png" className="logo" alt="" />
              </Link>
              <a className="navbar-toggle btn responsive-menu pull-right" data-toggle="collapse" data-target=".navbar-collapse">
                <i className='icon-menu-1'></i>
              </a>
            </div>
          </div>
          <div className="yamm">
            <div className="navbar-collapse collapse">
              <div className="container">
                <Link className="navbar-brand" to="/">
                  <img src="/images/logo.png" className="logo" alt="" />
                </Link>
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/gallery">
                      Gallery
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Navbar;

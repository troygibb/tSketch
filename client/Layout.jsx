import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

class Layout extends React.Component {
  render() {
    return (
      <div className="light-bg">
        <Navbar />
        { this.props.children }
        <Footer/>
      </div>
    );
  }
}

export default Layout;

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Footer from './Footer';


class Layout extends React.Component {
  render() {
    const { title, meta } = this.props.metatags;
    return (
      <div className="light-bg">
        <Helmet
          title={title}
          meta={meta}
        />
        <Navbar />
        { this.props.children }
        <Footer/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    metatags: state.metatags,
  };
};

export default connect(mapStateToProps)(Layout);

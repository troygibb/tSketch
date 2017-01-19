import React from 'react';
import { connect } from 'react-redux';

import { getGallery } from './actions/';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.renderColumns = this.renderColumns.bind(this);
  }
  componentWillMount() {
    this.props.getGallery();
  }
  renderRows() {
    const { galleryData } = this.props;
    const rows = [];
    let build = [];
    galleryData.forEach((postcard, i) => {
      if (i % 3 === 0 && i !== 0) {
        rows.push([...build, poscard]);
        build = [];
      } else {
        build.push(postcard);
      }
    })
  }
  render() {
    if (galleryData.length) {
      return (
        <div className="container">
          {}
        </div>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }
}

// TODO: deconstruct current state for cleaner code
const mapStateToProps = (currentState) => {
  return {
    galleryData: currentState.galleryData
  };
};

export default connect(mapStateToProps, { getGallery })(Gallery);

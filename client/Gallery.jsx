import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import { getGallery } from './actions';
import Loading from './Loading';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);
    this.organizeRows = this.organizeRows.bind(this);
  }
  componentWillMount() {
    this.props.getGallery();
  }
  organizeRows() {
    const { galleryData } = this.props;
    const flatData = [...galleryData];
    const rows = [];
    let build = [];
    let iterator = 0;
    while (flatData.length) {
      console.log(flatData)
      if (iterator === 3) {
        rows.push(build);
        build = [];
        iterator = 0;
      } else {
        build = [...build, flatData.shift()];
        iterator += 1;
      }
    }
    if (build.length) rows.push(build);
    return rows;
  }
  // TODO: Take away inline image styling
  renderColumns(row) {
    return row.map((column) => {
      return (
        <div key={column._id} className="col-md-4">
          <img alt="presentation" width="250px" src={column.postcardImage.secure_url} />
        </div>
      );
    });
  }
  renderRows() {
    const rows = this.organizeRows();
    return rows.map((row) => {
      return (
        <div key={uuid.v4()} className="row">
          { this.renderColumns(row) }
        </div>
      );
    });
  }
  render() {
    const { galleryData } = this.props;
    if (galleryData.length) {
      return (
        <div className="container">
          { this.renderRows() }
        </div>
      );
    }
    return (
      <Loading />
    );
  }
}

// TODO: deconstruct current state for cleaner code
const mapStateToProps = ({ galleryData }) => {
  return {
    galleryData,
  };
};

export default connect(mapStateToProps, { getGallery })(Gallery);

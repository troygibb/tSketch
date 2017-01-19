import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import { getGallery, clearOrders } from './actions';
import Loading from './Loading';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
    };
    this.renderRows = this.renderRows.bind(this);
    this.organizeRows = this.organizeRows.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
  }
  componentWillMount() {
    this.props.getGallery(this.state.pageNumber);
    this.setState({
      pageNumber: this.state.pageNumber + 1,
    });
  }
  componentWillUnmount() {
    // For reseting state to avoid duplicates.
    this.props.clearOrders();
  }
  loadMoreRows() {
    this.props.getGallery(this.state.pageNumber);
    this.setState({
      pageNumber: this.state.pageNumber + 1,
    });
  }
  organizeRows() {
    const { galleryData } = this.props;
    const flatData = [...galleryData];
    const rows = [];
    let build = [];
    let iterator = 0;
    while (flatData.length) {
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
          <li className="item thumb interactive">
            <a href="/">
              <figure>
                <figcaption className="text-overlay">
                  <div className="info">
                    <blockquote>
                      <p>{column.message}</p>
                    </blockquote>
                  </div>
                </figcaption>
                <img
                  alt="presentation"
                  className="doodle"
                  src={column.postcardImage.secure_url}
                />
              </figure>
            </a>
          </li>
        </div>
      );
    });
  }
  renderRows() {
    const rows = this.organizeRows();
    return rows.map((row) => {
      return (
        <div key={uuid.v4()} className="row items isotope col-3">
          { this.renderColumns(row) }
        </div>
      );
    });
  }
  render() {
    const { galleryData } = this.props;
    if (galleryData.length) {
      return (
        <div className="container bodyWrapper gallery">

          { this.renderRows() }

          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <button className="btn btn-primary btn-block" onClick={this.loadMoreRows}>
                Load More Doodles
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <Loading />
    );
  }
}

const mapStateToProps = ({ galleryData }) => {
  return {
    galleryData,
  };
};

export default connect(mapStateToProps, { getGallery, clearOrders })(Gallery);

import React from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';

class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingThumbnails: true,
    };
  }
  componentDidMount() {
    // Delay showing thumbnails for 1 second so the can load on Lob.
    setTimeout(() => {
      this.setState({
        loadingThumbnails: false,
      });
    }, 6000);
  }
  render() {
    return (
      <div className="container success">
        <h1>Success!</h1>
        <p>
          Your Doodle should arrive on {this.props.expectedDeliveryDate}.
        </p>
        <div className="row">
          <div className="col-md-6">
            <div className="success__thumbnail">
              { this.state.loadingThumbnails ?
                (<Loading text="Generating Postcard Thumbnail"/>) :
                (<img alt="Front Thumbnail" src={this.props.frontThumbnail} />)
              }
            </div>
          </div>
          <div className="col-md-6">
            <div className="success__thumbnail">
              { this.state.loadingThumbnails ?
                (<Loading text="Generating Postcard Thumbnail"/>) :
                (<img alt="Back Thumbnail" src={this.props.backThumbnail} />)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state.orderResponse;
};
export default connect(mapStateToProps)(Success);

import React from 'react';
import { connect } from 'react-redux';
import { ShareButtons } from 'react-share';
import FacebookProvider, { Comments } from 'react-facebook';
import { getGallerySingle } from './actions';
import Loading from './Loading';

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

class GallerySingle extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getGallerySingle(this.props.params.orderId);
  }
  render() {
    return (
      <div className="container bodyWrapper gallerySingle">
        {(this.props.loading) ?
          (<Loading />) :
        (
          <div className="row">
            <div className="col-md-6">
              <img
                alt="Your Doodle"
                src={this.props.postcardImage.secure_url}
                className="confirm__doodlePreview"
              />
            </div>
            <div className="col-md-6">
              <div>
                <h3 className="sidelines text-center">
                  <span>Postcard Message</span>
                </h3>
                <blockquote>
                  <p>{this.props.message}</p>
                </blockquote>
                <hr />
                <div className="row">
                  <div className="col-md-8">
                    <FacebookShareButton
                      url={window.location.href}
                    >
                      <button className="btn btn-primary btn-block">
                        Share On Facebook
                      </button>
                    </FacebookShareButton>
                  </div>
                  <div className="col-md-4">
                    <TwitterShareButton
                      url={window.location.href}
                      hashtags={['drawtrumpadoodle']}
                    >
                      <button className="btn btn-primary btn-block">
                        Tweet
                      </button>
                    </TwitterShareButton>
                  </div>
                </div>
                <div className="row">
                  <FacebookProvider appID="209101882887397">
                    <Comments href={window.location.href} />
                  </FacebookProvider>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (currentState) => {
  const {
    loading,
    order,
  } = currentState.gallerySingle;
  return {
    loading,
    id: order._id,
    postcardImage: order.postcardImage,
    message: order.message,
  };
};

export default connect(mapStateToProps, { getGallerySingle })(GallerySingle);

import React from 'react';
import { connect } from 'react-redux';
import { ShareButtons } from 'react-share';
import FacebookProvider, { Comments } from 'react-facebook';
import cloudinary from 'cloudinary-core';
import { getGallerySingle, clearOrderResponse } from './actions';
import Loading from './Loading';

const cl = cloudinary.Cloudinary.new( { cloud_name: CLOUDINARY_CLOUD_NAME });

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

class GallerySingle extends React.Component {
  constructor(props) {
    super(props);
    this.renderBody = this.renderBody.bind(this);
    this.renderOrderSuccess = this.renderOrderSuccess.bind(this);
  }
  componentWillMount() {
    this.props.getGallerySingle(this.props.params.orderId);
  }
  componentWillUnmount() {
    this.props.clearOrderResponse();
  }
  renderOrderSuccess() {
    return (
      <div className="orderSuccess">
        <h4>
          Your order was processed successfully. Expect your postcard to be delivered to the White House on {this.props.orderResponse.expectedDeliveryDate}
        </h4>
      </div>
    );
  }
  renderBody() {
    return (
      <div className="row">
        <div className="col-md-6">
          <img
            alt="Your Doodle"
            src={cl.url(this.props.postcardImage.public_id, { width: 570, crop: 'fit' })}
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
    );
  }
  render() {
    return (
      <div className="container bodyWrapper gallerySingle">
        {(Object.keys(this.props.orderResponse).length > 0) ? this.renderOrderSuccess() : null}
        {(this.props.loading) ? <Loading /> : this.renderBody()}
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
    orderResponse: currentState.orderResponse,
  };
};

export default connect(mapStateToProps, { getGallerySingle, clearOrderResponse })(GallerySingle);

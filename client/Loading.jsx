import React from 'react';
// import Spinner from 'react-spinkit';

const Loading = ({ text }) => {
  return (
    <div className="loadingIndicator">
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
      <h4>{text}</h4>
    </div>
  );
};
Loading.defaultProps = {
  text: 'Loading',
};

export default Loading;

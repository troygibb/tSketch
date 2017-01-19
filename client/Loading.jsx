import React from 'react';
import Spinner from 'react-spinkit';

const Loading = ({ text }) => {
  return (
    <div className="loadingIndicator">
      <Spinner
        spinnerName="three-bounce"
        noFadeIn
      />
      <h4>{text}</h4>
    </div>
  );
};
Loading.defaultProps = {
  text: 'Loading',
};

export default Loading;

import { ajax } from 'jquery';
import { browserHistory } from 'react-router';

export const changeAtramentOption = (change, changeValue) => {
  return {
    type: 'CHANGE-ATRAMENT-OPTION',
    change,
    changeValue,
  };
};

export const savePostcardImage = (postcardImage) => {
  return {
    type: 'SAVE-POSTCARD-IMAGE',
    postcardImage,
  };
};

export const changeMessage = (message) => {
  return {
    type: 'CHANGE-MESSAGE',
    message,
  };
};

export const showSuccessPage = (orderResponse) => {
  browserHistory.push('/doodle-success');
  return {
    type: 'SHOW-SUCCESS-PAGE',
    orderResponse,
  };
};

export const changeAddress = (change, changeValue) => {
  return {
    type: 'CHANGE-ADDRESS',
    change,
    changeValue,
  };
};

export const verifyAddress = (addressObject) => {
  return (dispatch) => {
    // Dispatch loading state
    dispatch({
      type: 'VERIFY-ADDRESS',
      data: {
        loading: true,
      },
    });

    ajax({
      url: '/api/verify-address',
      type: 'POST',
      data: {
        address: addressObject,
      },
    })
    .then((response) => {
      dispatch({
        type: 'VERIFY-ADDRESS',
        data: Object.assign({}, response.address, {
          name: addressObject.name, // lob drops the name value on validation
          warningMessage: response.message,
          verified: true,
        }),
      });
    })
    .fail((err) => {
      dispatch({
        type: 'VERIFY-ADDRESS',
        data: Object.assign({}, addressObject, {
          loading: false,
          verified: false,
          error: true,
        }),
      });
    });
  };
};

export const completeOrder = ({
  stripeToken,
  email,
  postcardImage,
  message,
  additionalAddress,
}) => {
  return (dispatch) => {
    // Upload image to cloudinary
    ajax({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      type: 'POST',
      data: {
        file: postcardImage,
        upload_preset: CLOUDINARY_UPLOAD_PRESET,
      },
    })
    .then((uploadData) => {
      // Process the order
      return ajax({
        type: 'POST',
        url: '/api/order',
        dataType: 'json',
        data: {
          postcardImage: uploadData,
          stripeToken,
          email,
          message,
          additionalAddress,
        },
      });
    })
    .then((orderResponse) => {
      dispatch(showSuccessPage(orderResponse));
      console.log('success');
    })
    .fail((err) => {
      console.log(err);
      console.log('ERRROR');
    });
  };
};

export const toggleAdditionalAddress = (showAdditionalAddress) => {
  return {
    type: 'TOGGLE-ADDITIONAL-ADDRESS',
    showAdditionalAddress,
  };
};

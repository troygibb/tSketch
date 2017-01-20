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

export const changeAddressName = (name) => {
  return {
    type: 'CHANGE-ADDRESS-NAME',
    name,
  };
};

export const addressVerified = ({ address, message }) => {
  // Delete object property returned from lob. It will throw errors if sent back up
  /* eslint no-param-reassign: 0 */
  delete address.object;
  return {
    type: 'ADDRESS-VERIFIED',
    address,
    addressWarning: message,
  };
};

export const addressLoading = (loading) => {
  return {
    type: 'ADDRESS-LOADING',
    loading,
  };
};

export const addressError = (error) => {
  return {
    type: 'ADDRESS-ERROR',
    error,
  };
};

export const getGallery = (page) => {
  return (dispatch) => {
    ajax({
      url: `/api/gallery?page=${page}`,
      type: 'GET',
    }).done(({ results }) => {
      dispatch({
        type: 'STORE-ORDERS',
        results,
      });
    });
  };
};

export const clearOrders = () => {
  return {
    type: 'CLEAR-ORDERS',
  };
};

export const changeBackgroundImage = (backgroundImage) => {
  browserHistory.push('/draw');
  return {
    type: 'CHANGE-BACKGROUND-IMAGE',
    backgroundImage,
  };
};

export const verifyAddress = (addressObject) => {
  return (dispatch) => {
    // Show loading indicator, remove error
    dispatch(addressLoading(true));
    dispatch(addressError(false));

    ajax({
      url: '/api/verify-address',
      type: 'POST',
      data: {
        address: addressObject,
      },
    })
    .then((response) => {
      dispatch(addressVerified(response));
    })
    .fail(() => {
      dispatch(addressError(true));
    })
    .always(() => {
      dispatch(addressLoading(false));
    });
  };
};

export const orderLoading = (loading) => {
  return {
    type: 'ORDER-LOADING',
    loading,
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
    dispatch(orderLoading(true));
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
    })
    .always(() => {
      dispatch(orderLoading(false));
    });
  };
};

export const toggleAddress = (showAddress) => {
  return {
    type: 'TOGGLE-ADDRESS',
    showAddress,
  };
};

export const gallerySingleLoading = (loading) => {
  return {
    type: 'GALLERY-SINGLE-LOADING',
    loading,
  };
};

export const showGallerySingle = (order) => {
  return {
    type: 'SHOW-GALLERY-SINGLE',
    order,
  };
};

export const getGallerySingle = (id) => {
  return (dispatch) => {
    dispatch(gallerySingleLoading(true));
    ajax({
      url: `/api/gallery/${id}`,
      type: 'GET',
    })
    .then((response) => {
      dispatch(showGallerySingle(response));
    })
    .fail((err) => {
      console.log(err);
    })
    .always(() => {
      dispatch(gallerySingleLoading(false));
    });
  };
};

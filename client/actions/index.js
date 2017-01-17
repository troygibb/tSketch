import { ajax } from 'jquery';

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

export const completeOrder = ({ stripeToken, email, postcardImage, message }) => {
  return (dispatch) => {
    ajax({
      type: 'POST',
      url: '/api/order',
      dataType: 'json',
      data: {
        stripeToken,
        email,
        postcardImage,
        message,
      },
    })
    .done(() => {
      console.log('SUCCESS');
    })
    .fail(() => {
      console.log('ERROR');
    });
  };
};

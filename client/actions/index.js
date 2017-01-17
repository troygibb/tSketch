import { ajax } from 'jquery';

export const assignLC = (lc) => {
  return {
    type: 'ASSIGN-LC',
    lc,
  };
};

export const assignAtrament = (atrament) => {
  return {
    type: 'ASSIGN-ATRAMENT',
    atrament,
  };
};

export const changeAtramentOption = (change, changeValue) => {
  return {
    type: 'CHANGE-ATRAMENT-OPTION',
    change,
    changeValue,
  };
};

// TODO: ERROR/SUCCESS handling for ajax call below
export const postImageMessage = (data) => {
  return (dispatch) => {
    ajax({
      type: 'POST',
      url: '/postImage',
      dataType: 'json',
      data,
    });
  };
};

export const changeMessage = (message) => {
  return {
    type: 'CHANGE-MESSAGE',
    message,
  };
};

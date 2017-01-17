import { ajax } from 'jQuery';

export const assignLC = (lc) => {
  return {
    type: 'ASSIGN-LC',
    lc,
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

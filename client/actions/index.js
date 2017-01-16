import { ajax } from 'jQuery';

export const assignLC = (lc) => {
	return {
		type: 'ASSIGN-LC',
		lc,
	}
};

export const postImage = (data) => {
	return (dispatch) => {
		ajax({
		  type: 'POST',
		  url: '/postImage',
		  dataType: 'json',
		  data,
		})
	}
}
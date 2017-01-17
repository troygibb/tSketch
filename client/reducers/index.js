const intitialState = {
	lc: {},
	message: '',
};

const actionHandler = {
	'ASSIGN-LC': (previousState, action) => Object.assign({}, previousState, { lc: action.lc }),
	'CHANGE-MESSAGE': (previousState, action) => Object.assign({}, previousState, { message: action.message }),
};

const reducer = (state = intitialState, action) => {
  if (actionHandler[action.type]) {
    return actionHandler[action.type](state, action);
  }
  return state;
};

export default reducer;
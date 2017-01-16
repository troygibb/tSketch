const intitialState = {
	lc: {},
};

const actionHandler = {
	'ASSIGN-LC': (previousState, action) => Object.assign({}, previousState, { lc: action.lc }),
};

const reducer = (state = intitialState, action) => {
  if (actionHandler[action.type]) {
    return actionHandler[action.type](state, action);
  }
  return state;
};

export default reducer;
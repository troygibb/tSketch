const intitialState = {
  lc: {},
  atramentOptions: {
    mode: 'draw',
    smoothing: false,
    weight: 10,
    opacity: 1,
    clearing: false,
  },
  message: '',
};

const actionHandler = {
  'ASSIGN-LC': (previousState, action) => Object.assign({}, previousState, { lc: action.lc }),
  'CHANGE-MESSAGE': (previousState, action) => Object.assign({}, previousState, { message: action.message }),
  'CHANGE-ATRAMENT-OPTION': (previousState, action) => {
    const x = Object.assign({}, previousState, {
      atramentOptions: {
        ...previousState.atramentOptions,
        [action.change]: action.changeValue,
      },
    });
    return x;
  },
};

const reducer = (state = intitialState, action) => {
  if (actionHandler[action.type]) {
    return actionHandler[action.type](state, action);
  }
  return state;
};

export default reducer;

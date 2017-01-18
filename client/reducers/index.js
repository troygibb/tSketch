const intitialState = {
  atramentOptions: {
    mode: 'draw',
    smoothing: false,
    weight: 10,
    opacity: 1,
    clearing: false,
    color: '#ff0068',
  },
  message: '',
  postcardImage: null,
  orderResponse: {},
  overCharacterLimit: false,
  additionalAddress: {
    name: '',
    address_line1: '',
    address_line2: '',
    address_city: '',
    address_state: '',
    address_zip: '',
  },
};

const actionHandler = {
  'ASSIGN-LC': (previousState, action) => Object.assign({}, previousState, { lc: action.lc }),
  'CHANGE-MESSAGE': (previousState, action) => Object.assign({}, previousState, { message: action.message }),
  'CHANGE-ATRAMENT-OPTION': (previousState, action) => {
    return Object.assign({}, previousState, {
      atramentOptions: {
        ...previousState.atramentOptions,
        [action.change]: action.changeValue,
      },
    });
  },
  'SAVE-POSTCARD-IMAGE': (previousState, action) => {
    return {
      ...previousState,
      postcardImage: action.postcardImage,
    };
  },
  'SHOW-SUCCESS-PAGE': (previousState, action) => {
    return {
      ...previousState,
      orderResponse: action.orderResponse,
    };
  },
  'CHANGE-ADDRESS': (previousState, action) => {
    return Object.assign({}, previousState, {
      additionalAddress: {
        ...previousState.additionalAddress,
        [action.change]: action.changeValue,
      },
    });
  },
};

const reducer = (state = intitialState, action) => {
  if (actionHandler[action.type]) {
    return actionHandler[action.type](state, action);
  }
  return state;
};

export default reducer;

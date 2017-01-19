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
  showAdditionalAddress: false,
  additionalAddress: {
    loading: false, // Not returned from lob
    verified: false, // Not returned from lob
    error: false, // Not returned from lob
    warningMessage: undefined, // Return from lob when address needs apt number
    name: '',
    address_line1: '', // Verify with lob
    address_line2: '', // Verify with lob
    address_city: '', // Verify with lob
    address_state: '', // Verify with lob
    address_zip: '', // Verify with lob
  },
};

const actionHandler = {
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
  'TOGGLE-ADDITIONAL-ADDRESS': (previousState, action) => {
    return {
      ...previousState,
      showAdditionalAddress: action.showAdditionalAddress,
    };
  },
  'CHANGE-ADDRESS': (previousState, action) => {
    // Invalidate any address verification if anything besides name is changed
    let verified = previousState.additionalAddress.verified;
    if (action.change !== 'name') {
      verified = false;
    }
    return Object.assign({}, previousState, {
      additionalAddress: {
        ...previousState.additionalAddress,
        [action.change]: action.changeValue,
        verified,
      },
    });
  },
  'VERIFY-ADDRESS': (previousState, action) => {
    return Object.assign({}, previousState, {
      additionalAddress: action.data,
    });
  },
  'TOGGLE-ADDITIONAL-ADDRESS': (previousState, action) => {
    return Object.assign({}, previousState, {
      showAdditionalAddress: action.showAdditionalAddress,
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

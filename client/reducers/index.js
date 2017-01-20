const intitialState = {
  atramentOptions: {
    mode: 'draw',
    smoothing: false,
    weight: 10,
    opacity: 1,
    clearing: false,
    color: '#ff0068',
  },
  backgroundImage: null,
  message: 'Dear Mr. Trump,',
  postcardImage: null,
  orderResponse: {
    postcardImage: {}, // Cloudinary image object
    additionalAddress: '', // true or false
    expectedDeliveryDate: '', // returned from lob
    message: '', // String
  },
  orderLoading: false,
  overCharacterLimit: false,
  showAddress: false,
  address: {
    address_line1: '', // Verify with lob
    address_line2: '', // Verify with lob
    address_city: '', // Verify with lob
    address_state: '', // Verify with lob
    address_zip: '', // Verify with lob
    address_country: 'US',
  },
  addressName: '',
  addressLoading: false,
  addressVerified: false,
  addressError: false,
  addressWarning: undefined, // Return from lob when address needs apt number
  galleryData: [], // For displaying in gallery
  gallerySingle: {
    loading: false,
    order: {
      postcardImage: {},
      message: '',
      id: '',
    },
  },
  metatags: {
    title: 'Draw Trump A Doodle: Make America Draw Again',
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
  'TOGGLE-ADDRESS': (previousState, action) => {
    return {
      ...previousState,
      showAddress: action.showAddress,
    };
  },
  'CHANGE-ADDRESS': (previousState, action) => {
    return Object.assign({}, previousState, {
      address: {
        ...previousState.address,
        [action.change]: action.changeValue,
      },
      addressVerified: false, // Invalidate address verification
    });
  },
  'CHANGE-ADDRESS-NAME': (previousState, action) => {
    return {
      ...previousState,
      addressName: action.name,
    };
  },
  'ADDRESS-VERIFIED': (previousState, action) => {
    return {
      ...previousState,
      address: action.address,
      addressWarning: action.addressWarning,
      addressVerified: true,
    };
  },
  'ADDRESS-LOADING': (previousState, action) => {
    return {
      ...previousState,
      addressLoading: action.loading,
    };
  },
  'ADDRESS-ERROR': (previousState, action) => {
    return {
      ...previousState,
      addressError: action.error,
    };
  },
  'ORDER-LOADING': (previousState, action) => {
    return {
      ...previousState,
      orderLoading: action.loading,
    };
  },
  'STORE-ORDERS': (previousState, action) => {
    return {
      ...previousState,
      galleryData: [...previousState.galleryData, ...action.results],
    };
  },
  'CLEAR-ORDERS': (previousState) => {
    return {
      ...previousState,
      galleryData: [],
    };
  },
  'CHANGE-BACKGROUND-IMAGE': (previousState, action) => {
    return {
      ...previousState,
      backgroundImage: action.backgroundImage,
    };
  },
  'GALLERY-SINGLE-LOADING': (previousState, action) => {
    return {
      ...previousState,
      gallerySingle: {
        ...previousState.gallerySingle,
        loading: action.loading,
      },
    };
  },
  'SHOW-GALLERY-SINGLE': (previousState, action) => {
    return {
      ...previousState,
      gallerySingle: {
        ...previousState.gallerySingle,
        order: action.order,
      },
    };
  },
};

const reducer = (state = intitialState, action) => {
  if (actionHandler[action.type]) {
    return actionHandler[action.type](state, action);
  }
  return state;
};

export default reducer;

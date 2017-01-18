const keystone = require('keystone');

const Types = keystone.Field.Types;

/**
 * Order Model
 * ==========
 */
const Order = new keystone.List('Order', {
  defaultColumns: 'name, email, isAdmin',
  nocreate: true,
  noedit: true,
  nodelete: true,
});

Order.add({
  email: {
    type: Types.Email,
    required: true,
    index: true,
  },
  postcardImage: {
    type: Types.CloudinaryImage,
    required: true,
  },
  message: {
    type: Types.Textarea,
  },
  stripeChargeId: {
    type: Types.Text,
    required: true,
  },
  postcardId: {
    type: Types.Text,
    required: true,
  },
  additionalPostcardId: {
    type: Types.Text,
  },
  additionalAddress: {
    address_line1: {
      type: Types.Text,
    },
    address_line2: {
      type: Types.Text,
    },
    address_city: {
      type: Types.Text,
    },
    address_state: {
      type: Types.Text,
    },
    address_zip: {
      type: Types.Text,
    },
    address_country: {
      type: Types.Text,
    },
  },
});

// Error handling for messages over 355 characters.
function validateMessageLength(next) {
  if (this.message.length > 355) {
    next('ERROR: Message length over 355 characters');
  } else {
    next();
  }
}
Order.schema.pre('save', validateMessageLength);

Order.register();

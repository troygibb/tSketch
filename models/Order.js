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
});

// Error handling for messages over 355 characters.
Order.schema.pre('save', (next) => {
  if (this.message.length > 355) {
    next('ERROR: Message length over 355 characters')
  } else { 
    next()
  }
});

Order.register();

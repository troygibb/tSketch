const keystone = require('keystone');

const Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
const User = new keystone.List('User', {
  defaultColumns: 'name, email, isAdmin',
});

User.add({
  name: {
    type: Types.Name,
    required: true,
    index: true,
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    index: true,
  },
  password: {
    type: Types.Password,
    initial: true,
  },
}, 'Permissions', {
  isAdmin: {
    type: Boolean,
    label: 'Can access Keystone',
    index: true,
  },
});


/**
 * Virtuals
 */

// Provide access to Keystone
function canAccessKeystone() {
  return this.isAdmin;
}
User.schema.virtual('canAccessKeystone').get(canAccessKeystone);

User.register();

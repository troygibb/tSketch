/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 */

const keystone = require('keystone');
const async = require('async');

const User = keystone.list('User');

const admins = [{
  email: 'troy.gibb@gmail.com',
  password: 'TempPass9',
  name: {
    first: 'Troy',
    last: 'Gibb',
  },
}, {
  email: 'ajlin500@gmail.com',
  password: 'TempPass9',
  name: {
    first: 'Andrew',
    last: 'Linfoot',
  },
}];

function createAdmin(admin, done) {
  /* eslint new-cap: ["error", { "properties": false }] */
  const newAdmin = new User.model(admin);

  newAdmin.isAdmin = true;
  newAdmin.save((err) => {
    if (err) {
      console.error(`Error adding admin ${admin.email} to the database:`);
      console.error(err);
    } else {
      console.log(`Added admin ${admin.email} to the database.`);
    }
    done(err);
  });
}

module.exports = (done) => {
  async.forEach(admins, createAdmin, done);
};

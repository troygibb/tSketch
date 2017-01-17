const async = require('async');
const cloudinary = require('cloudinary');
const keystone = require('keystone');
const stripe = require('stripe');
const lob = require('lob');
const mailgun = require('mailgun-js');

// Authorize APIs
stripe(process.env.STRIPE_SECRET_KEY);
lob(process.env.LOB_API_KEY);
mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const Order = keystone.list('Order');
const utils = keystone.utils;

function orderAPI(req, res) {
  // Check data
  const email = req.data.email;
  const postcardImage = req.data.postcardImage;
  const message = req.data.message;
  const stripeToken = req.data.stripeToken;
  if (!utils.isEmail(email) ||
      !utils.isDataURL(postcardImage) ||
      !utils.isString(message) ||
      !utils.isString(stripeToken)) {
    res.apiError('Invalid Input');
  }
  const order = new Order.model({
    email,
    message,
  });

  // Upload image to Cloudinary
  function uploadPostcardImage(callback) {
    cloudinary.uploader.upload(postcardImage, (result) => {
      if (result.error) {
        callback(result.error);
      } else {
        order.postcardImage = result;
        callback();
      }
    });
  }
  // Charge credit card
  function chargeCreditCard(callback) {
    stripe.charges.create({
      amount: 199, // $1.99 in cents
      currency: 'usd',
      source: stripeToken,
      description: `Charge for ${email}`,
    }, (err, charge) => {
      if (err) {
        callback(err);
      } else {
        order.stripeChargeId = charge.id;
        callback();
      }
    });
  }
  // Send postcard
    // On error, refund customer
  function sendPostcard(callback) {
    lob.postcards.create({
      description: `Card for ${email}`,
      to: {
        name: 'The White House',
        address_line1: '1600 Pennsylvania Avenue NW',
        address_city: 'Washington',
        address_state: 'DC',
        address_zip: '20500',
      },
      front: order.postcardImage.url,
      message,
    }, (err, response) => {
      if (err) {
        callback(err);
      } else {
        order.postcardId = response.id;
        callback();
      }
    });
  }
  // Save order to the database
  function saveOrder(callback) {
    order.save((err) => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
  }

  async.eachSeries([
    uploadPostcardImage,
    chargeCreditCard,
    sendPostcard,
    saveOrder,
  ], (err, result) => {
    if (err) {
      res.apiError('error');
    } else {
      res.apiResponse('success');
    }
  });
}

module.exports = orderAPI;

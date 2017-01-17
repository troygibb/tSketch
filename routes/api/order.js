const async = require('async');
const keystone = require('keystone');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const lob = require('lob')(process.env.LOB_API_KEY);
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const Order = keystone.list('Order');
const utils = keystone.utils;

function orderAPI(req, res) {
  // Check data
  const email = req.body.email;
  const postcardImage = req.body.postcardImage;
  const message = req.body.message;
  const stripeToken = req.body.stripeToken;
  if (!utils.isEmail(email) ||
      !utils.isObject(postcardImage) ||
      !utils.isString(message) ||
      !utils.isString(stripeToken)) {
    res.apiError('Invalid Input');
  }
  const order = new Order.model({
    email,
    message,
    postcardImage,
  });

  // Charge credit card
  function chargeCreditCard(callback) {
    stripe.charges.create({
      amount: 199, // $1.99 in cents
      currency: 'usd',
      source: stripeToken,
      description: `Charge for ${email}`,
    }, (err, charge) => {
      if (err) {
        console.log(err);
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
        console.log(err);
        callback(err);
      } else {
        order.postcardId = response.id;
        callback(null, response);
      }
    });
  }
  // Save order to the database
  function saveOrder(callback) {
    order.save((err) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback();
      }
    });
  }
  // Email receipt

  async.series([
    // uploadPostcardImage,
    chargeCreditCard,
    sendPostcard,
    saveOrder,
  ], (err, result) => {
    if (err) {
      console.log(err);
      res.apiError('error', err);
    } else {
      const postcardData = result[1];
      res.apiResponse({
        frontThumbnail: postcardData.thumbnails[0].medium,
        backThumbnail: postcardData.thumbnails[1].medium,
        expectedDeliveryDate: postcardData.expected_delivery_date,
      });
    }
  });
}

module.exports = orderAPI;

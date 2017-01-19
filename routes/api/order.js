const async = require('async');
const keystone = require('keystone');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Lob = require('lob')(process.env.LOB_API_KEY);
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
  const message = req.body.message || 'To Mr. Trump:';
  const stripeToken = req.body.stripeToken;
  const additionalAddress = req.body.additionalAddress || {};
  if (!utils.isEmail(email) ||
      !utils.isObject(postcardImage) ||
      !utils.isString(message) ||
      !utils.isString(stripeToken) ||
      !utils.isObject(additionalAddress)) {
    res.apiError('Invalid Input');
  }
  const order = new Order.model({
    email,
    message,
    postcardImage,
    additionalAddress,
  });

  // Check whether one or two postcards need to be send
  let twoPostcards = false;
  if (Object.keys(additionalAddress).length > 0) {
    twoPostcards = true;
  }

  // Charge credit card
  function chargeCreditCard(callback) {
    // Calulate total billing amount
    const costPerCard = 200; // $2.00 in cents
    let totalCost;
    if (twoPostcards) {
      totalCost = costPerCard * 2;
    } else {
      totalCost = costPerCard;
    }

    stripe.charges.create({
      amount: totalCost,
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
  // Send postcards
  function sendPostcards(callback) {
    const whitehouseAddress = {
      name: 'The White House',
      address_line1: '1600 Pennsylvania Avenue NW',
      address_city: 'Washington',
      address_state: 'DC',
      address_zip: '20500',
    };
    let whitehousePostcardResponse;
    async.each([
      whitehouseAddress, additionalAddress,
    ], (address, done) => {
      const postcardData = {
        description: `Card for ${email}`,
        front: order.postcardImage.url,
        message,
      };
      if (Object.keys(address).length === 0) {
        done(); // No additional address, don't try to send card
        return;
      }
      const postcardDataWithAddress = Object.assign({}, postcardData, { to: address });
      Lob.postcards.create(postcardDataWithAddress, (err, response) => {
        if (err) {
          done(err);
        } else if (JSON.stringify(whitehouseAddress) === JSON.stringify(address)) {
          // Whitehouse Postcard
          order.postcardId = response.id;
          whitehousePostcardResponse = response;
          done();
        } else {
          // Additional Postcard
          order.additionalPostcardId = response.id;
          done();
        }
      });
    }, (err) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, whitehousePostcardResponse);
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
  function emailReceipt(callback) {
    const data = {
      from: 'Doodle Master <doodlemaster@drawtrumpadoodle.com>',
      to: order.email,
      subject: 'You Doodle Has Been Received! 🎉  🎊  🎁',
      text: 'We have successfully recieved your doodle! It will be on its way to the whitehouse soon!!',
    };

    mailgun.messages().send(data, (err) => {
      if (err) {
        console.log(err);
      }
      callback();
    });
  }


  async.series([
    chargeCreditCard,
    sendPostcards,
    saveOrder,
    emailReceipt,
  ], (err, result) => {
    if (err) {
      console.log(err);
      res.apiError('error', err);
    } else {
      const postcardData = result[1];
      res.apiResponse({
        postcardImage,
        expectedDeliveryDate: postcardData.expected_delivery_date,
        additionalAddress: twoPostcards,
        message,
      });
    }
  });
}

module.exports = orderAPI;

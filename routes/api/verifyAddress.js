const keystone = require('keystone');
const Lob = require('lob')(process.env.LOB_API_KEY);

const utils = keystone.utils;

function verifyAddress(req, res) {
  // Check data
  const address = req.body.address;
  if (!utils.isObject(address)) {
    res.apiError('Invalid Input');
  }
  Lob.verification.verify(address, (err, response) => {
    if (err) {
      res.apiError('error', err);
    } else {
      res.apiResponse(response);
    }
  });
}

module.exports = verifyAddress;

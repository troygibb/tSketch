const keystone = require('keystone');

const Order = keystone.list('Order');

function gallerySingle(req, res) {
  Order.model.findOne()
    .where('_id', _id)
}

module.exports = gallerySingle;

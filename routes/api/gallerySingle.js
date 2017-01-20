const keystone = require('keystone');

const Order = keystone.list('Order');

function gallerySingle(req, res) {
  const id = req.params.id;

  Order.model.findOne()
    .where('_id', id)
    .select('message postcardImage')
    .exec((err, response) => {
      if (err) {
        res.apiError('Error', err);
      } else {
        res.apiResponse(response);
      }
    });
}

module.exports = gallerySingle;

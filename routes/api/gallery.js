const keystone = require('keystone');

const Order = keystone.list('Order');

function gallery(req, res) {
  const page = req.query.page || 0;
  const perPage = req.query.perPage || 12;

  Order.paginate({
    page,
    perPage,
    maxPages: 1,
  })
    .sort('-createdAt')
    .select('postcardImage message')
    .exec((err, response) => {
      if (err) {
        res.apiError('Error', err);
      } else {
        res.apiResponse(response);
      }
    });
}

module.exports = gallery;

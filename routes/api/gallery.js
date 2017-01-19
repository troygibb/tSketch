const keystone = require('keystone');
const Order = keystone.list('Order');

function gallery(req, res) {
  const page = req.query.page || 0;
  const resultsPerPage = 12;

  Order.paginate({
    page,
    perPage: resultsPerPage,
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

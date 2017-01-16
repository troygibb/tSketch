const keystone = require('keystone');

const importRoutes = keystone.importer(__dirname);

// Import Route Controllers
const routes = {
  // params: importRoutes('./params'),
  // views: importRoutes('./views'),
  // api: importRoutes('./api'),
  middleware: importRoutes('./middleware'),
  // rss: importRoutes('./rss'),
};


keystone.pre('routes', routes.middleware.webpack.hotMiddleware);
keystone.pre('routes', routes.middleware.webpack.devMiddleware);

// pre:routes
// Note keep these first so redirected routes don't run uncessirry middleware
//  redirectOldRoutes requires imageCache to run first
// keystone.pre('routes', routes.middleware.imageCache);
// keystone.pre('routes', routes.middleware.initLocals);

// pre:render
// anything that hits the DB should be under pre:render because it then only runs
//   when view.render('') is called. This prevents unecissary db calls on routes
//   that don't need the data (rss, js bundle, etc.)
// keystone.pre('render', routes.middleware.metatags);

// Set 404 route
// keystone.set('404', routes.views['404']);

// Setup Route Bindings
module.exports = function routesIndex(app) {
  // Static Files
  app.use(routes.middleware.webpack.buildStatic);
  app.use('/node_modules', routes.middleware.webpack.nodeModulesStatic);

  // Views
  // app.get('/', routes.views.index);
};

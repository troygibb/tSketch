const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'build.js',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
  noInfo: true,
});

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
});

const nodeModulesStatic = express.static(path.join(process.env.PWD, 'node_modules'));
const buildStatic = express.static(path.join(process.env.PWD, 'build'));

module.exports = {
  devMiddleware,
  hotMiddleware,
  nodeModulesStatic,
  buildStatic,
};

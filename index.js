const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

process.env.PWD = process.cwd();
const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

if (TARGET !== 'production' && TARGET !== 'test') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'build.js',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
    noInfo: true,
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

const port = process.env.PORT || 3000;

app.use('/node_modules', express.static(path.join(process.env.PWD, 'node_modules')));
app.use(express.static(path.join(process.env.PWD, 'build')));

// TEST API
app.post('/postImage', (req, res) => {
  console.log('Got the post!');
  // data in req.body
  res.end();
})

app.listen(port, () => console.log(`Listening on the magical port http://localhost:${port}`));

module.exports = { app };

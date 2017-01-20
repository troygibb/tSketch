const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

process.env.PWD = process.cwd();

const PATHS = {
  app: path.join(process.env.PWD, 'client'),
  style: path.join(process.env.PWD, 'client/styles'),
  build: path.join(process.env.PWD, 'build'),
  vendor: path.join(process.env.PWD, 'client'),
  images: path.join(process.env.PWD, 'client/styles/images'),
};

const common = {
  target: 'web',
  entry: {
    app: `${PATHS.app}/App.jsx`,
    style: `${PATHS.style}/main.scss`,
    vendor: `${PATHS.vendor}/vendor.js`,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'DependencyMap',
      template: `${PATHS.app}/index.ejs`,
    }),
    new webpack.DefinePlugin({
      STRIPE_PUBLIC_KEY: JSON.stringify(process.env.STRIPE_PUBLIC_KEY),
      CLOUDINARY_UPLOAD_PRESET: JSON.stringify(process.env.CLOUDINARY_UPLOAD_PRESET),
      CLOUDINARY_CLOUD_NAME: JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME),
    }),
  ],
  module: {
    loaders: [
      {
        test: /.*\.jsx?$/,
        include: PATHS.app,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: PATHS.style,
      },
      {
        test: /\.png$|\.jpg$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
  resolve: {
    // Empty string needed.
    extensions: ['', '.js', '.jsx', '.node'],
  },
};

const buildConfig = (previousConfig) => {
  return Object.assign({}, previousConfig, {
    plugins: [
      ...previousConfig.plugins,
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new CleanWebpackPlugin([PATHS.build], {
        root: process.env.PWD,
      }),
    ],
  });
};

const devConfig = (previousConfig) => {
  return Object.assign({}, previousConfig, {
    entry: {
      app: [
        `${PATHS.app}/app.jsx`, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        `${PATHS.style}/main.scss`, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      ],
    },
    devtool: 'source-map',
    plugins: [
      ...previousConfig.plugins,
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
  });
};

const TARGET = process.env.npm_lifecycle_event;
const config = TARGET === 'build' || TARGET === 'postinstall' ? buildConfig(common) : devConfig(common);
console.log(config);
module.exports = validate(config);

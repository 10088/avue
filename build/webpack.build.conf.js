const path = require('path');
const webpack = require('webpack');
const version = require('../package.json').version;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('./config');
const banner =
  ' Avue.js v' +
  version +
  '\n' +
  ' (c) 2017-' +
  new Date().getFullYear() +
  ' Smallwei\n' +
  ' Released under the MIT License.\n';

module.exports = {
  entry: {
    app: ['./packages/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    library: 'AVUE',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias
  },
  externals: config.externals,
  module: {
    rules: [{
      test: /\.(jsx?|babel|es6)$/,
      include: process.cwd(),
      exclude: config.jsexclude,
      loader: 'babel-loader'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        preserveWhitespace: false
      }
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.html$/,
      loader: 'html-loader?minimize=false'
    },
    {
      test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: path.posix.join('static', '[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.svg(\?\S*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: path.posix.join('static', '[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(gif|png|jpe?g)(\?\S*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: path.posix.join('static', '[name].[hash:7].[ext]')
      }
    }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
};

var webpack = require('webpack');
var path = require('path');
var jsPath = path.resolve(__dirname, './');
var nodeExternals = require('webpack-node-externals');

var exports = {
  entry: path.resolve(jsPath, './app.js'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'app.js',
    libraryTarget: 'commonjs'
  },
  node: {
    __filename: false,
    __dirname: false
  },
  devtool: 'source-map',
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    root: jsPath,
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  exports.plugins = exports.plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]);
}

module.exports = exports;
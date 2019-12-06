const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/register");

const basedir = path.join(__dirname);

const config = {
  entry: ['@babel/polyfill','./src/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     hash: true
    // })
    new HtmlWebpackPlugin({
      template: path.join(basedir, 'src', 'index.html'),
      filename: 'index.html'
    }),
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  devServer: {
    contentBase: __dirname + '/public',
    compress: true,
    port: 3000,
    open: true,
    stats: {
      assets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      entrypoints: false,
      hash: false,
      modules: false,
      timings: false,
      version: false,
    }
  },
  watch: false,
  devtool: 'source-map',
};

module.exports = config;
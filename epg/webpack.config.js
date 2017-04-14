const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    'index': './index',
  },
  output: {
    path: './dist',
    // filename:  process.env.NODE_ENV === 'production' ? '[name][hash:7].js' : '[name].js',
    filename: '[name][hash:7].js',
    // filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    root: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './components'),
    ],
  },
  module: {
    loaders: [{
      test: /\.vue$/, loader: 'vue',
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ['es2015'],
        plugins: ['transform-runtime'],
      }
    }, {
      test: /\.json$/, loader: 'json',
    },{
      test:/\.(?:jpg|png|gif)$/,
      loader:'file',
    },]
  },
  // externals: {
  //   'vue': 'Vue',
  //   'vue-resource': 'VueResource',
  //   'vue-router': 'VueRouter',
  // },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
    }),
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),*/
  ]
}

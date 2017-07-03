var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var config = require('../config')
var webpack = require('webpack')
var common = config.prod.common
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var prodConfig = merge(baseConfig, {
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.prod.env
    }),
    new ExtractTextPlugin('css/[name].css'),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false
    // }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
})

if (common && common.length > 0) {
  prodConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: 2
  }))
}

module.exports = prodConfig

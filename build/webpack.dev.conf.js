var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var path = require('path')

const config = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, '../dev')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
})

module.exports = config

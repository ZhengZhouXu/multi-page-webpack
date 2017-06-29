var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')

// 单独打包css放这里
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var config = merge(baseConfig, {
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
    new ExtractTextPlugin('css/[name].css')
  ]
})

module.exports = config

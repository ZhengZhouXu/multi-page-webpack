var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

webpack(webpackConfig, function (err, stats) {
  console.log('完成！')
})

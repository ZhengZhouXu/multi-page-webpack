var path = require('path')
var utils = require('./utils')
var htmlWebpackPlugin = require('html-webpack-plugin')
var glob = require('glob')
var basename = path.basename
var resolve = path.resolve
var utils = require('./utils')

const config = {
  entry: {},
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }]
  },
  plugins: []
}

var src = resolve(__dirname, '../src')

// 注册html-webpack-plugin
var allHtml = glob.sync(path.join(src, '**/*.html'))
Array.prototype.push.apply(config['plugins'], utils.createHtmlPlugins(allHtml))

// 注册entry
var allJs = glob.sync(path.join(src, '**/*.js'))
Object.assign(config.entry, utils.createEntrys(allJs))

module.exports = config

var path = require('path')
var utils = require('./utils')
var htmlWebpackPlugin = require('html-webpack-plugin')
var glob = require('glob')
var basename = path.basename
var utils = require('./utils')

const config = {
  entry: {},
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: []
}

var src = path.resolve(__dirname, '../src')

// 注册html-webpack-plugin
var allHtml = glob.sync(path.join(src, '**/*.html'))
Array.prototype.push.apply(config['plugins'], utils.createHtmlPlugins(allHtml))

// 注册entry
var allJs = glob.sync(path.join(src, '**/*.js'))
Object.assign(config.entry, utils.createEntrys(allJs))

module.exports = config

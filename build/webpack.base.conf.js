var path = require('path')
var utils = require('./utils')
var htmlWebpackPlugin = require('html-webpack-plugin')
var basename = path.basename
// var ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  entry: {},
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: []
}

var src = path.resolve(__dirname, '../src')
var allHtml = utils.searchFile(src, /\.html$/)
var htmlPlugins = allHtml.map(file => {
  return new htmlWebpackPlugin({
    chunks: [basename(file).split('.')[0]],
    filename: 'page/' + basename(file),
    template: file
  })
})

var allJs = utils.searchFile(src, /\.js$/)
allJs.forEach(file => {
  var filename = basename(file).split('.')[0]
  config.entry[filename] = file
})

Array.prototype.push.apply(config['plugins'], htmlPlugins)
console.log(1)
module.exports = config

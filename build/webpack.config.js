var path = require('path')
var utils = require('./utils')
var htmlWebpackPlugin = require('html-webpack-plugin')
var basename = path.basename
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  entry: {
    main: '../src/main.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
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

var allCss = utils.searchFile(src, /\.css$/)
allCss.forEach(file => {
  var extractText = new ExtractTextPlugin('css/' + basename(file))
  config.module.rules.shift({
    test: new RegExp(basename(file) + '$'),
    use: extractText.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  })

  config.plugins.push(extractText)
})

Array.prototype.push.apply(config['plugins'], htmlPlugins)

module.exports = config

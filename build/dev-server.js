var webpack = require('webpack')
var devConfig = require('./webpack.dev.conf')
var htmlWebpackPlugin = require('html-webpack-plugin')

var path = require('path')
var webpackWatcher = null

var chokidar = require('chokidar')
var watcher = chokidar.watch(path.resolve(__dirname, '../src'), {
  ignoreInitial: true
})

watcher.on('add', function (filename) {
  if(webpackWatcher) webpackWatcher.close()

  devConfig.plugins.push(new htmlWebpackPlugin({
    chunks: [path.basename(filename).split('.')[0]],
    filename: 'page/' + path.basename(filename),
    template: filename
  }))

  bundle()
  console.log(`File ${path} has been added`)
})

function bundle () {

  var bs = require('browser-sync').create()
  var compiler = webpack(devConfig)

  bs.init({
    server: path.resolve(__dirname, '../dist')
  })
  webpackWatcher = compiler.watch({}, function () {
    bs.reload("*.html,*.js")
    console.log('已重新打包')
  })
}

bundle()



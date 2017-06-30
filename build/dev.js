var webpack = require('webpack')
var devConfig = require('./webpack.dev.conf')
var htmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var chokidar = require('chokidar')
var webpackWatcher = null
var src = path.resolve(__dirname, '../src')
var bs = require('browser-sync').create()
var utils = require('./utils')

// 初始化browser-sync
bs.init({
    server: path.resolve(__dirname, '../dist'),
    logConnections: false,
    logFileChanges: false,
    notify: false,
    startPath: '/page/index.html'
})
// 监听文件修改
chokidar.watch(src, {
  ignoreInitial: true
}).on('add', function (filename) {
  var ext = path.extname(filename)

  switch (ext.toLowerCase()) {
    case '.html':
      setHtmlConfig(filename)
      break
    case '.js':
      setJsConfig(filename)
      break
  }

  console.log(`File ${path} has been added`)

  bundle(path.basename(filename))
})

function setHtmlConfig (filename) {
  Array.prototype.push.apply(devConfig.plugins, utils.createHtmlPlugins(filename))
}

function setJsConfig (filename) {
  Object.assign(devConfig.entry, utils.createEntrys(filename))
}

// 打包+监听
function bundle (file) {
  var compiler = webpack(devConfig)

  if(webpackWatcher) webpackWatcher.close()
  webpackWatcher = compiler.watch({}, function () {
    bs.reload("*.html,*.js")
    console.log('reload')
  })
}

bundle("*.html,*.js")

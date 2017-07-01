var webpack = require('webpack')
var devConfig = require('./webpack.dev.conf')
var htmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var chokidar = require('chokidar')
var webpackWatcher = null
var bs = require('browser-sync').create()
var utils = require('./utils')
var fs = require('fs')
var devDir = path.resolve(__dirname, '../dev')
var rm = require('rimraf')
var basename = path.basename
var config = require('../config/index')

// 初始化browser-sync
bs.init({
    port: config.dev.port,
    server: {
      baseDir: devDir,
      middleware: function (req, res, next) {
        // console.log("Hi from middleware");
        // res.send('123')
        // next();
      }
    },
    logConnections: false,
    logFileChanges: false,
    notify: false,
    startPath: config.dev.startPath
})

// 监听文件修改
chokidar.watch(path.resolve(__dirname, '../src'), {
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

  bundle()
}).on('unlink', function (filename) {
  var ext = path.extname(filename)
  var base = path.basename(filename)

  switch (ext.toLowerCase()) {
    case '.html':
      rmHtml(filename)
      break
    case '.js':
      rmJs(filename)
      break
  }
  bundle()
})

function setHtmlConfig (filename) {
  Array.prototype.push.apply(devConfig.plugins, utils.createHtmlPlugins(filename))
}

function setJsConfig (filename) {
  // 新增js入口
  Object.assign(devConfig.entry, utils.createEntrys(filename))
  // 对应的html打包
    devConfig.plugins.forEach(obj => {
    if (obj.constructor === htmlWebpackPlugin) {
      if (basename(obj.options.template).split('.')[0] === basename(filename).split('.')[0]) {
        obj.options.chunks.push(basename(filename).split('.')[0])
      }
    }
  })
}

/**
 * 删除html
 * @param {string} filename
 */
function rmHtml (filename) {
  var file = path.basename(filename).split('.')[0]

  devConfig.plugins = devConfig.plugins.filter(obj => !(obj in htmlWebpackPlugin && obj.options.template === filename))
  rm.sync('dev/page/' + base)
}

/**
 * 删除js
 * @param {string} filename
 */
function rmJs (filename) {
  var base = path.basename(filename)
  var file = base.split('.')[0]
  // 修改配置文件
  for(key in devConfig.entry) {
    if (key === file) {
      delete devConfig.entry[key]
      rm.sync('dev/js/' + base)
      break
    }
  }
  // devConfig.plugins = devConfig.plugins.filter(obj => !(obj in htmlWebpackPlugin && obj.options.template === filename))
  devConfig.plugins.forEach(obj => {
    if (obj.constructor === htmlWebpackPlugin) {
      var chunks = obj.options.chunks
      var index = chunks.indexOf(file)
      if (index >= 0) {
        chunks.splice(index, 1)
      }
    }
  })
}

// 打包+监听
function bundle () {
  var compiler = webpack(devConfig)
  console.log('reload')
  if(webpackWatcher) webpackWatcher.close()
  webpackWatcher = compiler.watch({}, function () {
    bs.reload("*.html,*.js")
    // console.log('reload')
  })
}

bundle()

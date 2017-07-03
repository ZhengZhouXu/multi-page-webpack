// var path = require('path')
// var fs = require('fs')

// exports.searchFile = function searchFile (p, reg, all) {
//   if (!all) all = []

//   var files = fs.readdirSync(p)

//   files.forEach(file => {
//     var fullPath = path.join(p, file)
//     if (isDir(fullPath)) {
//       searchFile(fullPath, reg, all)
//     }
//   })

//   all.push.apply(all,
//     files
//       .filter(file => reg.test(file))
//       .map(file => path.resolve(p, file))
//   )

//   return all
// }

// function isDir (filename) {
//   return fs.statSync(filename).isDirectory()
// }
var htmlWebpackPlugin = require('html-webpack-plugin')
var basename = require('path').basename
var config = require('../config')
var env = process.env.NODE_ENV
var common = config.prod.common

exports.createHtmlPlugins = function createHtmlPlugins (filenames) {
  if (Object.prototype.toString.call(filenames) !== '[object Array]') {
    filenames = [filenames]
  }
  return filenames.map(file => {
    var chunks = []
    // 公共模块打包
    if (env === 'production' && common && common.length > 0) {
      chunks.push('common')
    }
    chunks.push(basename(file).split('.')[0])

    return new htmlWebpackPlugin({
      chunks: chunks,
      filename: 'page/' + basename(file),
      template: file
    })
  })
}

exports.createEntrys = function createEntrys (filenames) {
  if (Object.prototype.toString.call(filenames) !== '[object Array]') {
    filenames = [filenames]
  }

  var obj = {}
  filenames.forEach(file => {
    obj[basename(file).split('.')[0]] = file
  })

  // 生产模式，公共模块打包
  if (env === 'production' && common && common.length > 0) {
    obj['common'] = config.prod.common
  }

  return obj
}

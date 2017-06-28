var path = require('path')
var fs = require('fs')

exports.searchFile = function searchFile (p, reg, all) {
  if (!all) all = []

  var files = fs.readdirSync(p)

  files.forEach(file => {
    var fullPath = path.join(p, file)
    if (isDir(fullPath)) {
      searchFile(fullPath, reg, all)
    }
  })

  all.push.apply(all,
    files
      .filter(file => reg.test(file))
      .map(file => path.resolve(p, file))
  )

  return all
}

function isDir (filename) {
  return fs.statSync(filename).isDirectory()
}




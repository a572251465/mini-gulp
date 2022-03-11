const File = require('vinyl')
const through = require('through2')

function wrapVinyl() {
  function wrapFile(globFile, next) {
    next(null, new File(globFile))
  }
  return through.obj(wrapFile)
}

module.exports = wrapVinyl

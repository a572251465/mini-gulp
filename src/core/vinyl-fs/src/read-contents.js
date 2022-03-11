const through = require('through2')
const fs = require('fs')

function readContents() {
  function readFile(file, next) {
    fs.readFile(file.path, 'binary', (err, data) => {
      file.contents = Buffer.from(data)
      next(null, file)
    })
  }
  return through.obj(readFile)
}

module.exports = readContents

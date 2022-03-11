const writeContents = require('./write-contents')
function dest(outFolder) {
  return writeContents(outFolder)
}
module.exports = dest

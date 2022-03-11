const GlobStream = require('./glob-stream')
const wrapVinyl = require('./wrap-vinyl')
const readContents = require('./read-contents')

function src(glob, opt) {
  // 为了生成一个可读流
  const gs = new GlobStream(glob, opt)
  return gs.pipe(wrapVinyl()).pipe(readContents())
}

module.exports = src

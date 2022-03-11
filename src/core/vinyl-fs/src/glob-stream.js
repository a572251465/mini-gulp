const { Readable } = require('stream')
const util = require('util')
const { Glob } = require('glob')
const globParent = require('glob-parent')
const toAbsoluteGlob = require('to-absolute-glob')

function GlobStream(glob, opt = {}) {
  opt.cwd = opt.cwd || process.cwd()
  Readable.call(this, { objectMode: true })
  const absoluteGlob = toAbsoluteGlob(glob)
  const basePath = globParent(absoluteGlob, {})

  const globber = new Glob(absoluteGlob, opt)
  this._globber = globber

  globber.on('match', (filePath) => {
    let obj = {
      cwd: opt.cwd,
      base: basePath,
      path: filePath
    }
    this.push(obj)
  })
  globber.on('end', (filePath) => {
    this.push(null)
  })
}

util.inherits(GlobStream, Readable)
GlobStream.prototype._read = function () {
  this._globber.resume()
}

module.exports = GlobStream

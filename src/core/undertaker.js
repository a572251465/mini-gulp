const util = require('util')
const EventEmitter = require('events')

function Undertaker() {
  EventEmitter.call(this)

  // 存放任务
  this._tasks = {}
}

/**
 * @author lihh
 * @description 注册任务
 * @param {*} name  任务名称
 * @param {*} fn  任务函数
 */
function task(name, fn) {
  this._tasks[name] = fn
}

/**
 * @author lihh
 * @description 串行任务
 */
function series() {
  const fns = Array.from(arguments)
  const fn = buildSeries(fns)
  return fn.bind(this)
}

/**
 * @author lihh
 * @description 并行任务
 */
function parallel() {
  const fns = Array.from(arguments)
  const fn = bindParallel(fns)
  return fn.bind(this)
}

Undertaker.prototype.task = task
Undertaker.prototype.series = series
Undertaker.prototype.parallel = parallel

/**
 * @author lihh
 * @description 实现串行逻辑
 * @param {*} args 执行任务
 */
function buildSeries(args) {
  return function (done) {
    const len = args.length
    const self = this
    const results = []

    const next = (idx) => {
      let value = args[idx]
      if (typeof value !== 'function') {
        value = self._tasks[value]
      }

      const startMS = Date.now()
      self.emit('start', { name: value.name })
      value((err, result) => {
        self.emit('stop', { name: value.name, duration: [(Date.now() - startMS) / 1000] })
        results[idx] = result
        if (++idx >= len) {
          done && done(err, result)
        } else {
          next(idx)
        }
      })
    }
    next(0)
  }
}

/**
 * @author lihh
 * @description 进行并行执行
 * @param {*} values
 * @returns
 */
function bindParallel(values) {
  return function (done) {
    let counter = values.length
    const self = this

    const next = (idx) => {
      let value = values[idx]
      const results = []
      if (typeof value !== 'function') {
        value = self._tasks[value]
      }

      const startMS = Date.now()
      self.emit('start', { name: value.name })
      value((err, result) => {
        self.emit('stop', { name: value.name, duration: [(Date.now() - startMS) / 1000] })
        results[idx] = result
        if (--counter === 0) {
          done && done(err, results)
        }
      })
    }
    for (let i = 0; i < values.length; i += 1) {
      next(i)
    }
  }
}

util.inherits(Undertaker, EventEmitter)

module.exports = Undertaker

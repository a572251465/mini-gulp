/**
 * @author lihh
 * @description 给实例上注册task
 * @param {*} gulpInst gulp实例
 * @param {*} tasks 需要注册task
 */
function registerExports(gulpInst, tasks) {
  if (!tasks || typeof tasks !== 'object') return

  Object.entries(tasks).forEach(([name, fn]) => {
    gulpInst.task(name, fn)
  })
}

module.exports = registerExports

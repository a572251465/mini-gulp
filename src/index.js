const registerExports = require('./core/registerExports')
const path = require('path')
const shellOptions = process.argv.slice(2)
// 默认任务名称
let taskName = 'default'
// 文件名称
let configFileName = 'gulpfile.js'

// 此处可以自由选择配置文件
const index = shellOptions.findIndex((item) => item === '--config')
if (index !== -1) {
  configFileName = shellOptions[index + 1]
}
if (index === -1 && shellOptions.length > 0) {
  taskName = shellOptions[0]
}
// 获取配置文件的路径
const configPath = path.resolve(process.cwd(), configFileName)
// 获取导出对象
const exported = require(configPath)
// 获取gulp实例
const gulpInst = require('./core/Gulp')
const logEvents = require('./core/logEvents')
logEvents(gulpInst)

// 将导出的实例 注册到gulp身上
registerExports(gulpInst, exported)
gulpInst.parallel(taskName)()

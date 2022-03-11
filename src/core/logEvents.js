const { getAssetsTime } = require('./utils')

function logEvents(gulpInst) {
  gulpInst.on('start', (evt) => {
    console.log(`[${getAssetsTime()}] Starting '${evt.name}'...`)
  })
  gulpInst.on('stop', (evt) => {
    console.log(`[${getAssetsTime()}] Finished '${evt.name}' after ${evt.duration[0]} ms`)
  })
}

module.exports = logEvents

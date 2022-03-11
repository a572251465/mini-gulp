function padStart(value) {
  return String(value).padStart(2, '0')
}

function getAssetsTime() {
  const date = new Date()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()

  return `${padStart(h)}:${padStart(m)}:${padStart(s)}`
}

module.exports = {
  getAssetsTime
}

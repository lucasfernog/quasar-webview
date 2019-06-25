module.exports.dev = async api => {
  const config = require('./config.js')(api)
  await require(`../${config.language}/dev.js`)(api)
}

module.exports.build = async api => {
  const config = require('./config.js')(api)
  await require(`../${config.language}/build.js`)(api)
}
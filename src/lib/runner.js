module.exports.dev = async (api, cfg) => {
  const config = require('./config.js')(api)
  await require(`../${config.language}/dev.js`)(api, cfg)
}

module.exports.build = async (api, cfg) => {
  const config = require('./config.js')(api)
  await require(`../${config.language}/build.js`)(api, cfg)
}
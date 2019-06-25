module.exports.install = async (language, api) => {
  const logger = require('./logger.js')(api),
    log = logger('app:webview')
  log('Checking dependencies...')
  // ensure deps are installed
  require(`../${language}/ensure-deps.js`)()
  log('All dependencies are installed!')

  // install feature
  await require(`../${language}/install.js`)(api)
}
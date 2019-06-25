module.exports = api => {
  const extensionConfig = require(api.resolve.app('quasar.extensions.json'))['@quasar/portal']
  return extensionConfig
}
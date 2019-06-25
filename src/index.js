module.exports = async function(api) {
  const webviewRunner = require('./lib/runner.js')

  api.afterBuild(async () => {
    await webviewRunner.build(api)
  })
}

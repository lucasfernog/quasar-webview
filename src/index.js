module.exports = async function(api) {
  const webviewRunner = require('./lib/runner.js')

  api.afterBuild(async (api, cfg) => {
    await webviewRunner.build(api, cfg)
  })

  api.afterDev(async (api, cfg) => {
    await webviewRunner.dev(api, cfg)
  })
}

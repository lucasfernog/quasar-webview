module.exports = async function (api) {
  if (api.ctx.mode !== 'webview') {
    return
  }

  const webviewRunner = require('./lib/runner.js')

  api.afterBuild(async (api, { quasarConf }) => {
    await webviewRunner.build(api, quasarConf)
  })

  api.afterDev(async (api, { quasarConf }) => {
    await webviewRunner.dev(api, quasarConf)
  })
}

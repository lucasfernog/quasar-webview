const execa = require('execa')

module.exports = async (api, cfg) => {
  const logger = require('../lib/logger.js')(api),
    log = logger('app:webview'),
    warn = logger('app:webview', 'red')

  log('Starting Rust Webview...')

  const out = await execa(
    'cargo',
    ['run', '--features', 'dev', '--', '--url', cfg.build.APP_URL], {
      stdio: 'inherit',
      cwd: api.resolve.webview('')
    }
  )
  if (out.code) {
    warn('Error executing `cargo run`.')
  } else {
    log('Running...')
  }
}

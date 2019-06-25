const execa = require('execa')

module.exports = async (api, cfg) => {
  const logger = require('../lib/logger.js')(api),
    log = logger('app:webview'),
    warn = logger('app:webview', 'red')

  log('Building Rust Webview...')

  const buildFn = target => execa(
      'cargo',
      ['build', '--features', 'prod']
      .concat(api.ctx.debug ? [] : ['--release'])
      .concat(target ? ['--target', target] : []),
      {
        stdio: 'inherit',
        cwd: api.resolve.webview('')
      }
    )

  const out = await buildFn()
  if (out.code) {
    warn('Error executing `cargo build`.')
  } else {
    log('Built successfully.')
  }

  process.exit(out.code)
}

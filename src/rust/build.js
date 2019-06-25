const execa = require('execa')

module.exports = async api => {
  const logger = require('../lib/logger.js')(api),
    log = logger('app:webview'),
    warn = logger('app:webview', 'red')

  log('Building Rust Webview...')

  const buildFn = target => execa(
      'cargo',
      ['build']
      .concat(api.ctx.debug ? [] : ['--release'])
      .concat(['--features', 'prod'])
      .concat(target ? ['--target', target] : []),
      {
        stdio: 'inherit',
        cwd: api.resolve.webview('')
      }
    )

  const out = await buildFn()
  if (out.code) {
    warn('Error executing cargo command.')
  } else {
    log('Built successfully.')
  }

  process.exit(out.code)
}

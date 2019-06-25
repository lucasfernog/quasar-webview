/**
 * Quasar App Extension install script
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 *
 */

module.exports = async function(api) {
  await require('./lib/installer.js').install(api.prompts.language, api)
}

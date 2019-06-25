module.exports = async api => {
  const logger = require('../lib/logger.js')(api),
    log = logger('app:webview'),
    warn = logger('app:webview', 'red'),
    execa = require('execa')

  const inquirer = require('../lib/prompt.js'),
    questions = require('./helpers/prompts.js')

  const targets = (await inquirer(questions.targets)).targets
  for (const target of targets) {
    const architectures = (await inquirer(questions.architectures(target))).architectures
    const abiPrompts = questions.abi(target)
    let abi = ''
    if (abiPrompts[0].choices.length) {
      abi = (await inquirer(abiPrompts)).abi
    } else if (target === 'apple') {
      abi = 'darwin'
    }

    for (const architecture of architectures) {
      const targetTriple = `${architecture}-${target}-${abi}`
    }
  }
  
  log('Installing Rust Webview...')
  api.render('./base')
}

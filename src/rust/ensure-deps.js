const dependencyWarn = dep => {
  warn(`'${dep}' is a dependency. Please install it and then run 'quasar ext invoke @quasar/portal' again.`)
}

const commandExistsSync = require('command-exists').sync

module.exports = () => {
  let depsAreInstalled = true
  if (!commandExistsSync('rustup')) {
    dependencyWarn('rustup')
    depsAreInstalled = false
  }

  if (!commandExistsSync('cargo')) {
    dependencyWarn('cargo')
    depsAreInstalled = false
  }

  if (!depsAreInstalled) {
    process.exit(1)
  }
}
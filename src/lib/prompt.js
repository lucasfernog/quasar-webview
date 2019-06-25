const inquirer = require('inquirer')
module.exports = async questions => {
  const prompts = await inquirer.prompt(questions)
  return prompts
}
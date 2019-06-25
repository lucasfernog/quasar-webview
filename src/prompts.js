/**
 * Quasar App Extension prompts script
 *
 * Inquirer prompts
 * (answers are available as "api.prompts" in the other scripts)
 * https://www.npmjs.com/package/inquirer#question
 *
 */

module.exports = function() {
  return [
    {
      name: 'language',
      type: 'list',
      required: true,
      message: 'Please choose the language:',
      default: 0,
      choices: [
        {
          name: 'Rust (recommended)',
          value: 'rust'
        },
        {
          name: 'C#',
          value: 'csharp'
        }
      ]
    }
  ]
}

const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const chalk = require('chalk')
const {tokgen, env} = require('@helpers')

let config = {}

try {
  if (!fs.existsSync(path.join(__dirname, 'config.js'))) {
    console.warn(chalk.yellow.bold('`config.js` for server settings was not found! Generating new `config.js` file'))
    const template = fs.readFileSync(path.join(__dirname, 'config.template.js'))
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
    const compiled = _.template(template)
    const replacements = {
      sessionSecret: tokgen()
    }
    fs.writeFileSync(path.join(__dirname, 'config.js'), compiled(replacements))
    console.warn(chalk.green.bold('New `config.js` for server settings file was generated. You could update your settings here: "server/config/config.js"'))
  }
  config = require('./config')
} catch (error) {
  console.warn(chalk.red.bold('\r\n=============================================='))
  console.warn(chalk.red.bold('  Unable to load external `config.js` file!'))
  console.warn(chalk.red.bold(' ', error))
  console.warn(chalk.red.bold('==============================================\r\n'))
  process.exit(1)
}

let envConfig = {}

if (env.isDev()) {
  envConfig = require('./dev')
} else if (env.isTest()) {
  envConfig = require('./test')
} else if (env.isProduction()) {
  envConfig = require('./prod')
}

const base = require('./base')

module.exports = _.defaultsDeep(envConfig, config, base)

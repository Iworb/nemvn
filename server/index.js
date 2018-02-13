require('module-alias/register')
const config = require('@config')
const logger = require('@engine/logger')

const chalk = require('chalk')
const moment = require('moment')

const db = require('@engine/mongo')()
const app = require('@engine/express')(db)

require('@helpers/safeStop')

logger.info(chalk.bold('-----------------[ Server starting at %s ]-----------------'), moment().format('YYYY-MM-DD HH:mm:ss.SSS'))

app.listen(config.port, config.ip, () => {
  logger.info('----------------------------[ Application started! ]----------------------------')
  logger.info(`Environment:\t${chalk.underline.bold(process.env.NODE_ENV)}`)
  logger.info(`IP:\t\t\t${config.ip}`)
  logger.info(`Port:\t\t\t${config.port}`)
  logger.info('--------------------------------------------------------------------------------')
  require('@helpers/sysinfo')
  logger.info('--------------------------------------------------------------------------------')
})

exports = module.exports = app

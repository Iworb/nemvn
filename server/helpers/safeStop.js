const logger = require('@engine/logger')

const chalk = require('chalk')
const moment = require('moment')

const smoothExit = async () => {
  const exit = () => {
    logger.info()
    logger.info(chalk.bold('------[ Server stopped at %s Uptime: %s ]------'), moment().format('YYYY-MM-DD HH:mm:ss.SSS'), moment.duration(process.uptime() * 1000).humanize())
    return process.exit(0)
  }
  return exit()
}

process.on('SIGINT', smoothExit).on('SIGTERM', smoothExit)

const winston = require('winston')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

const config = require('@config')
const {env} = require('@helpers')

const transports = []

/**
 * Console transporter
 */
transports.push(new winston.transports.Console({
  level: config.logging.console.level,
  colorize: true,
  prettyPrint: true,
  handleExceptions: env.isProduction()
}))

/**
 * File transporter
 */
if (config.logging.file.enabled) {
  // Create logs directory
  const logDir = config.logging.file.path
  if (!fs.existsSync(logDir)) {
    mkdirp(logDir)
  }

  transports.push(new (require('winston-daily-rotate-file'))({
    filename: path.join(logDir, 'server.log'),
    level: config.logging.file.level || 'info',
    timestamp: true,
    json: config.logging.file.json || false,
    handleExceptions: true
  }))

  if (config.logging.file.exceptionFile) {
    transports.push(new winston.transports.File({
      filename: path.join(logDir, 'exceptions.log'),
      level: 'error',
      timestamp: true,
      json: config.logging.file.json || false,
      prettyPrint: true,
      handleExceptions: true,
      humanReadableUnhandledException: true
    }))
  }
}

/**
 * Logentries transporter
 * https://logentries.com/
 */
if (config.logging.logentries.enabled && config.logging.logentries.token) {
  console.log('Logentries log transport enabled!')
  require('le_node')
  transports.push(new winston.transports.Logentries({
    level: 'debug',
    token: config.logging.logentries.token
  }))
}

/**
 * Papertrail transporter
 * https://papertrailapp.com/
 */
if (config.logging.papertrail.enabled) {
  console.log('Papertrail log transport enabled!')
  // eslint-disable-next-line no-unused-expressions
  require('winston-papertrail').Papertrail
  transports.push(new winston.transports.Papertrail(config.logging.papertrail))
}

const logger = new winston.Logger({
  level: 'debug',
  transports: transports,
  exitOnError: false
})

/**
 * Loggly transporter
 * https://www.loggly.com/
 */
if (config.logging.loggly.enabled && config.logging.loggly.token) {
  console.log('Loggly log transport enabled!')
  require('winston-loggly-bulk')
  logger.add(winston.transports.Loggly, {
    inputToken: config.logging.loggly.token,
    subdomain: config.logging.loggly.subdomain,
    tags: config.logging.loggly.tags,
    json: config.logging.loggly.json
  })
}

/**
 * Logsene transporter
 * https://sematext.com/logsene/
 */
if (config.logging.logsene.enabled && config.logging.logsene.token) {
  console.log('Logsene log transport enabled!')
  const logsene = require('winston-logsene')
  logger.add(logsene, {
    type: 'vem-server',
    token: config.logging.logsene.token
  })
}

/**
 * Logz.io transporter
 * https://logz.io/
 */
if (config.logging.logzio.enabled && config.logging.logzio.token) {
  console.log('Logz.io log transport enabled!')
  const logzio = require('winston-logzio')
  logger.add(logzio, {
    token: config.logging.logzio.token
  })
}

/**
 * Graylog transporter
 * https://www.graylog.org/
 */
if (config.logging.graylog.enabled) {
  console.log('Graylog log transport enabled! Servers: ' + JSON.stringify(config.logging.graylog.servers))
  let graylog = require('winston-graylog2')
  logger.add(graylog, {
    name: 'Graylog',
    level: 'debug',
    graylog: {
      servers: config.logging.graylog.servers,
      facility: config.logging.graylog.facility
    }
  })
}

module.exports = logger

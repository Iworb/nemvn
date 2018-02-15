const config = require('@config')
const logger = require('@engine/logger')
const {env} = require('@helpers')

const chalk = require('chalk')
const mongoose = require('mongoose')

module.exports = () => {
  mongoose.Promise = global.Promise

  if (mongoose.connection.readyState !== 1) {
    logger.info(`Connecting to Mongo ${config.db.uri} ...`)
    mongoose.connection.on('error', err => {
      if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
        logger.warn('Mongo connection timeout!', err)
        setTimeout(() => {
          mongoose.connect(config.db.uri, config.db.options)
        }, 1000)
        return
      }

      logger.error('Could not connect to MongoDB!')
      return logger.error(err)
    })
    mongoose.connection.once('open', () => {
      logger.info(chalk.yellow.bold('Mongo DB connected.'))
      logger.info()
    })
    mongoose.connect(config.db.uri, config.db.options)
      .then(() => {
        mongoose.set('debug', env.isDev())
      })
  } else {
    logger.info('Mongo already connected.')
  }

  return mongoose.connection
}

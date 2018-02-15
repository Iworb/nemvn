const c = require('@engine/constants')
const logger = require('@engine/logger')
const response = require('@engine/response')

const mongoose = require('mongoose')
const _ = require('lodash')
const router = require('express').Router()

module.exports = (app, ...middlewares) => {
  router.use('/users', require('./user'))
  app.use('/api', router)

  middlewares.forEach(middleware => middleware(app))

  app.use((err, req, res, next) => {
    if (!err) return next()

    logger.error(err.stack)
    if (err instanceof mongoose.Error.ValidationError) {
      const fields = {}
      _.each(err.errors, e => {
        fields[e.path] = _.isArray(e.properties) ? e.properties : e.message
      })
      return response.json(res, null, response.BAD_REQUEST, null, {fields})
    } else if (err.name && err.name === 'BulkWriteError') {
      switch (err.code) {
        case 11000:
          let field = err.message.split('.$')[1]
          field = field.split(' dup key')[0]
          field = field.substring(0, field.lastIndexOf('_'))
          return response.json(res, null, response.BAD_REQUEST, null, {fields: {[field]: c.E.UNIQUE}})
      }
    } else {
      return response.json(res, null, response.SERVER_ERROR, err.message)
    }
  })

  app.use((req, res) => {
    return response.json(res, null, response.NOT_FOUND)
  })
}

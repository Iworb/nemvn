const _ = require('lodash')

module.exports = {

  BAD_REQUEST: {
    status: 400,
    type: 'BAD_REQUEST'
  },

  UNAUTHORIZED: {
    status: 401,
    type: 'UNAUTHORIZED'
  },

  REQUEST_FAILED: {
    status: 402,
    type: 'REQUEST_FAILED'
  },

  FORBIDDEN: {
    status: 403,
    type: 'FORBIDDEN'
  },

  NOT_FOUND: {
    status: 404,
    type: 'NOT_FOUND'
  },

  TOO_MANY_REQUEST: {
    status: 429,
    type: 'TOO_MANY_REQUEST'
  },

  SERVER_ERROR: {
    status: 500,
    type: 'SERVER_ERROR'
  },

  NOT_IMPLEMENTED: {
    status: 501,
    type: 'NOT_IMPLEMENTED'
  },

  /**
   * Generate a JSON REST API response
   *
   * If data present and no error, we will send status 200 with JSON data
   * If no data but has error, we will send HTTP error code and message
   *
   * @param  {Object} res          ExpressJS res object
   * @param  {Object} data         Response data
   * @param  {Object} err          Error object
   * @param  {String} errMessage   Custom error message
   * @param  {Object} extraParams  Extra error params
   * @return {*} If res assigned, return with res, otherwise return the response JSON object
   */
  json (res, data, err, errMessage, extraParams) {
    const response = {}
    if (err) {
      response.error = err
      response.status = err.status || 500
      if (errMessage) {
        response.error.message = errMessage.message || errMessage
      }
      if (extraParams && _.isObject(extraParams)) response.error = _.assign(response.error, extraParams)
      response.data = data
      if (res) res.status(response.status)
    } else {
      response.status = 200
      response.data = data
    }
    return res ? res.json(response) : response
  }
}

const config = require('@config')
const logger = require('@engine/logger')
const {env} = require('@helpers')
const nuxtConfig = require('@/nuxt.config')

const express = require('express')
const session = require('express-session')
const compress = require('compression')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const {Nuxt, Builder} = require('nuxt')

/**
 * Initialize middlewares
 * @param {any} app
 */
function initMiddleware (app) {
  app.use(compress({
    filter: (req, res) => {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
    },
    level: 3,
    threshold: 512
  }))

  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.set('etag', true)
  if (env.isDev()) {
    const Stream = require('stream').Stream
    const mlStream = new Stream()
    mlStream.writable = true
    mlStream.write = data => {
      return logger.debug(data)
    }
    app.use(morgan('dev', {
      stream: mlStream
    }))
  }
}

/**
 * Initiliaze Helmet security module
 * @param {any} app
 */
function initHelmetHeaders (app) {
  app.use(helmet.xssFilter())
  app.use(helmet.noSniff())
  app.use(helmet.frameguard())
  app.use(helmet.ieNoOpen())
  app.use(helmet.hidePoweredBy())
}

/**
 * Initialize session
 * @param {any} app
 */
function initSession (app) {
  app.use(session(config.session))
}

/**
 * Initialize Nuxt
 * @param {any} app
 */
function initNuxt (app) {
  nuxtConfig.dev = !env.isProduction()
  const nuxt = new Nuxt(nuxtConfig)
  if (nuxtConfig.dev) {
    new Builder(nuxt).build()
  }
  app.use(nuxt.render)
}

module.exports = () => {
  const app = express()

  initMiddleware(app)
  initHelmetHeaders(app)
  initSession(app)
  initNuxt(app)

  return app
}

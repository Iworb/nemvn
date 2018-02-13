require('module-alias/register')
const config = require('@config')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const configSession = config.session
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session(configSession))

const {Nuxt, Builder} = require('nuxt')
const nuxtConfig = require('@/nuxt.config')
nuxtConfig.dev = process.env.NODE_ENV !== 'production'
const nuxt = new Nuxt(nuxtConfig)

if (nuxtConfig.dev) {
  new Builder(nuxt).build()
}
app.use(nuxt.render)

app.listen(3000, () => {
  console.log(`Application was started at the 3000th port`)
})

exports = module.exports = app

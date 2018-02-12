require('module-alias/register')
const express = require('express')
const app = express()

const {Nuxt, Builder} = require('nuxt')
const nuxtConfig = require('@/nuxt.config')
const nuxt = new Nuxt(nuxtConfig)
if (process.env.NODE_ENV !== 'production') {
  (new Builder(nuxt)).build()
}

app.use(nuxt.render)

app.listen(3000, () => {
  console.log(`Application was started at the 3000th port`)
})

exports = module.exports = app

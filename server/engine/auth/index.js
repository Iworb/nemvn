const logger = require('@engine/logger')
const User = require('@models/user')

const passport = require('passport')
const chalk = require('chalk')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, '-local.password')
      .then(user => {
        // Check that the user is not disabled or deleted
        if (user.status !== 1) return done(null, false)
        return done(null, user)
      })
      .catch(done)
  })

  logger.info(chalk.bold('Passport strategies initialization...'))
  const strategies = ['local']
  strategies.forEach(strategy => {
    logger.info(`Loading ${strategy} passport strategy`)
    require(`./strategies/${strategy}`)
  })
}

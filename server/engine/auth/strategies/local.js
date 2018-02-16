const c = require('@engine/constants')
const User = require('@models/user')
const {FieldsError} = require('@engine/errors')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await User.findOne({
      $or: [
        {name: username},
        {'local.email': username}
      ]
    })
    if (!user) return done(new FieldsError({username: c.E.NOT_FOUND}))
    if (user.status !== 1) return done(new FieldsError({username: c.E.DISABLED}))
    if (!(await user.verifyPassword(password))) return done(new FieldsError({password: c.E.INVALID}))
    return done(null, user)
  } catch (err) {
    return done(err)
  }
}))

const passport = require('passport')
const router = require('express').Router()

const User = require('@models/user')

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    req.login(user, err => {
      if (err) return next(err)
      return res.json(true)
    })
  })(req, res, next)
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.post('/signup', User.createUser.bind(User))

module.exports = router

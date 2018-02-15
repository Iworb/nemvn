const response = require('@engine/response')
const User = require('@models/user')
const {isAuthenticated} = require('@engine/auth/helpers')

const router = require('express').Router()

router.get('/', (req, res, next) => {
  const limit = req.body.limit || req.query.limit || 50
  let page = req.body.page || req.query.page || 1
  let total
  if (page < 1) page = 1
  page--
  User.count()
    .then(c => {
      total = c
      return User.find({}, {name: 1}).limit(limit).skip(limit * page)
    })
    .then(users => {
      return res.json({
        total: total,
        items: users
      })
    })
    .catch(next)
})

router.get('/me', isAuthenticated, (req, res, next) => {
  return res.json(req.user.toObject())
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {'local.password': 0})
    .then(user => {
      return res.json(user)
    })
    .catch(next)
})

router.post('/', User.createUser.bind(User))

router.patch('/me', isAuthenticated, User.updateUser.bind(User))

router.patch('/:id', isAuthenticated, User.updateUser.bind(User))

router.delete('/:id', (req, res, next) => {
  return response(res, null, response.REQUEST_FAILED)
  // User.findByIdAndRemove(req.params.id)
  //   .then(() => {
  //     return res.json(true)
  //   })
  //   .catch(next)
})

module.exports = router

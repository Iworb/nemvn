const response = require('@engine/response')
const User = require('@models/user')

const _ = require('lodash')
const flatten = require('flat')
const router = require('express').Router()

router.get('/', (req, res, next) => {
  User.find({}, {'local.password': 0})
    .then(users => {
      return res.json(users)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {'local.password': 0})
    .then(user => {
      return res.json(user)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  let values = _.pick(req.body, _.keys(User.schema.paths))
  if (values._id) delete values._id
  values = _.pickBy(flatten(values), _.identity)
  const newUser = new User(values)
  return newUser.save().then(user => {
    return response.json(res, _.omit(user.toObject(), 'local.password'))
  }).catch(next)
})

router.patch('/:id', User.updateUser.bind(User))

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      return res.json(true)
    })
    .catch(next)
})

module.exports = router

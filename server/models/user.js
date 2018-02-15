const c = require('@engine/constants')

const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const flatten = require('flat')
const _ = require('lodash')

const validateLocalStrategyProperty = function (property) {
  return property && property.length
}

const validateLocalStrategyPassword = function (password) {
  return password && password.length >= 6
}

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    index: true,
    default: '',
    validate: [validateLocalStrategyProperty, c.E.REQUIRED]
  },
  local: {
    email: {
      type: String,
      trim: true,
      index: true,
      lowerCase: true,
      default: '',
      unique: true,
      match: [/.+@.+\..+/, c.E.NOT_VALID],
      validate: [validateLocalStrategyProperty, c.E.REQUIRED]
    },
    password: {
      type: String,
      default: '',
      validate: [validateLocalStrategyPassword, [c.E.MIN_LENGTH, 6]]
    }
  },
  profile: {
    name: {type: String},
    gender: {type: String},
    picture: {type: String}
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

async function protectPassword (next) {
  if (typeof this.getUpdate === 'function') {
    if (this.getUpdate()['local.password']) {
      this.getUpdate()['local.password'] = await bcrypt.hash(this.getUpdate()['local.password'], 12)
    }
  } else {
    if (this.isModified('local.password')) {
      this.local.password = await bcrypt.hash(this.local.password, 12)
    }
  }
  return next()
}

userSchema.pre('save', protectPassword)

userSchema.pre('update', protectPassword)

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.local.password)
}

userSchema.methods.verifyPasswordSync = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

userSchema.virtual('avatar').get(function () {
  if (this.profile && this.profile.picture) {
    return this.profile.picture
  }
  const getRandomUserAvatarId = str => {
    let c = 0
    for (let i = 0; i < str.length; i++) {
      c += str.charCodeAt(i)
    }
    return c % 100
  }
  const email = this.local.email
  if (!email) {
    const g = this.profile && this.profile.gender === 'female' ? 'women' : 'men'
    return `https://randomuser.me/api/portraits/thumb/${g}/${getRandomUserAvatarId(this.local.name)}.jpg`
  } else {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    return `https://gravatar.com/avatar/${hash}?s=64&d=wavatar`
  }
})

userSchema.statics.updateUser = function (req, res, next) {
  let values = _.pick(req.body, _.keys(userSchema.paths))
  if (values._id) delete values._id
  values = _.pickBy(flatten(values), _.identity)
  return this.findById(req.params.id)
    .then(user => {
      if (
        ((req.body.passNew && req.body.passNew.length) ||
          (req.body.passNewConfirm && req.body.passNewConfirm.length)) &&
        req.body.passNew !== req.body.passNewConfirm) {
        user.invalidate('passNew', c.E.NOT_MATCH)
        throw user.invalidate('passNewConfirm', c.E.NOT_MATCH)
      }
      if (req.body.passNew) {
        if (!_.isDefined(values['local.password'])) {
          throw user.invalidate('local.password', c.E.REQUIRED)
        }
        if (!user.verifyPasswordSync(values['local.password'])) {
          throw user.invalidate('local.password', c.E.NOT_VALID)
        }
        values['local.password'] = req.body.passNew
      }
      return user.update(values)
    })
    .then(() => {
      return res.json(true)
    })
    .catch(next)
}

module.exports = mongoose.model('User', userSchema)
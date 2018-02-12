module.exports = {
  isDev () {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  },

  isProduction () {
    return process.env.NODE_ENV === 'production'
  },

  isTest () {
    return process.env.NODE_ENV === 'test'
  }
}

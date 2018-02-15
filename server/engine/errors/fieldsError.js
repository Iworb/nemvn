module.exports = class FormError extends Error {
  constructor (fields, message, status) {
    super(message)
    this.status = status || 400
    this.fields = fields
    Error.captureStackTrace(this, this.constructor)
  }
}

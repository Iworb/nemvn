module.exports = {
  session: {
    secret: '0vM5gFOGBgckiedO8gjkHR5FipPQcG69XoeIX8tAp5F',
    resave: true,
    saveUninitialized: false,
    cookie: {
      // reset session after 1 week
      maxAge: 7 * 24 * (60 * 60 * 1000),
      // we will use cookies just for HTTP, not js
      // JS will send this cookies only from current domain
      httpOnly: true,
      // should be 'true' if you're using https
      secure: false
    }
  }
}

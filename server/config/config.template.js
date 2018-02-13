const path = require('path')

module.exports = {
  ip: process.env.NODE_IP || '0.0.0.0',
  port: process.env.NODE_PORT || 3000,
  session: {
    secret: '{{sessionSecret}}',
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
  },
  logging: {
    console: {
      level: 'debug'
    },
    file: {
      enabled: true,
      path: path.normalize(path.join(__dirname, '..', '..', 'logs')),
      level: 'info',
      json: false,
      exceptionFile: true
    },
    logentries: {
      enabled: false,
      token: null
    },
    papertrail: {
      enabled: false,
      host: null,
      port: null,
      level: 'debug',
      program: 'vem'
    },
    loggly: {
      enabled: false,
      token: null,
      subdomain: null,
      tags: [],
      json: true
    },
    logsene: {
      enabled: false,
      token: null
    },
    logzio: {
      enabled: false,
      token: null
    },
    graylog: {
      enabled: false,
      servers: [{host: '192.168.1.100', port: 12201}],
      facility: 'MEVN'
    }
  }
}

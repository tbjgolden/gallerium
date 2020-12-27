'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./gallerium.cjs.production.js')
} else {
  module.exports = require('./gallerium.cjs.development.js')
}

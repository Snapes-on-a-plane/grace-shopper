const router = require('express').Router()
const jwt = require('express-jwt')
var jwks = require('jwks-rsa')
module.exports = router

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://teariffic.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:8080/',
  issuer: 'https://teariffic.auth0.com/',
  algorithms: ['RS256']
})

//router.use(jwtCheck)
router.use('/users', require('./users'))

// NL: adding routes to serve up the products data.
router.use('/bubbles', require('./bubbles'))
router.use('/orders', require('./orders'))

router.use('/checkout', require('./checkout'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

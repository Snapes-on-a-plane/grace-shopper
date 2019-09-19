const router = require('express').Router()
module.exports = router

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

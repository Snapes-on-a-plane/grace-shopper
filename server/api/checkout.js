const router = require('express').Router()
const {Payment} = require('../db/models')
const checkAuth = require('./securityHelpers')

module.exports = router

// GET api/checkout
router.get('/', checkAuth, async (req, res, next) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      const checkout = await Payment.findAll()
      res.json(checkout, authData)
    }
  })
  // try {
  //   const checkout = await Payment.findAll()
  //   res.json(checkout)
  // } catch (err) {
  //   next(err)
  // }
})

router.post('/add', checkAuth, async (req, res, next) => {
  try {
    const checkout = await Payment.create(req.body)
    res.json(checkout)
  } catch (err) {
    next(err)
  }
})

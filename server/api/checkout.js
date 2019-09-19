const router = require('express').Router()
const {Payment} = require('../db/models')
module.exports = router

// GET api/checkout
router.get('/', async (req, res, next) => {
  try {
    const checkout = await Payment.findAll()
    res.json(checkout)
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const checkout = await Payment.create(req.body)
    res.json(checkout)
  } catch (err) {
    next(err)
  }
})

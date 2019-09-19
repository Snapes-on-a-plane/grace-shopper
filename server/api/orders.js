const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allOrder = await Order.findAll()
    res.send(allOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/form', (req, res, next) => {
  try {
    console.log(req.body)
  } catch (err) {
    next(err)
  }
})

module.exports = router

const router = require('express').Router()
const {Payment, Order, Order_BubbleTea} = require('../db/models')
const checkAuth = require('./securityHelpers')

module.exports = router

// GET api/checkout
router.get('/', async (req, res, next) => {
  //   if (err) {
  //     res.sendStatus(403)
  //   } else {
  //     const checkout = await Payment.findAll()
  //     res.json(checkout, authData)
  //   }
  // })
  try {
    const checkout = await Payment.findAll()
    res.json(checkout)
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    // 1) save to order table
    const order = await Order.create({
      totalPrice: req.body.price,
      totalQuantity: req.body.qty,
      userId: req.session.userId
    })
    if (!order) {
      throw new Error('order failed.')
    }
    let values = []
    req.body.arrItem.map(el => {
      let line = {}
      line.orderId = order.id
      line.bubbleTeaId = el.info.id
      line.bubbleTeaPrice = el.info.price
      line.bubbleTeaQuantity = req.body.qty // -- bug: need to fix later
      values.push(line)
      return line
    })
    // 2) save to Order_BubbleTea table
    const order_bubbleTea = Order_BubbleTea.bulkCreate(values, {
      returning: true
    })

    // 3) save to payment
    //const checkout = await Payment.create(req.body)
    //res.json(checkout)
  } catch (err) {
    next(err)
  }
})

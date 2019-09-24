const router = require('express').Router()
const {Payment, Order, Order_BubbleTea} = require('../db/models')

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
    // 1) save to order table
    console.log('in 1')
    const order = await Order.create({
      totalPrice: req.body.price,
      totalQuantity: req.body.qty,
      userId: req.session.userId
    })
    if (!order) {
      throw new Error('order failed.')
    }
    let values = []
    let orderId = 0
    console.log('in 2')
    req.body.arrItem.map(el => {
      let line = {}
      orderId = order.id
      line.orderId = order.id
      line.bubbleTeaId = el.info.id
      line.bubbleTeaPrice = el.info.price
      line.bubbleTeaQuantity = req.body.qty // -- bug: need to fix later
      values.push(line)
      return line
    })
    console.log('in 3')
    // 2) save to Order_BubbleTea table
    const order_bubbleTea = Order_BubbleTea.bulkCreate(values, {
      returning: true
    })

    // 3) save to payment
    console.log('in here', order_bubbleTea)
    if (order_bubbleTea) {
      console.log('id', req.body.selectedPayment.id)
      const payment = {
        tokenId: req.body.selectedPayment.id,
        userId: req.session.userId,
        orderId: orderId
      }
      const checkout = await Payment.create(payment)
      res.json(checkout)
    }
  } catch (err) {
    next(err)
  }
})

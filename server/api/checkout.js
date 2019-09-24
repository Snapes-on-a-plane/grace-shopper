const router = require('express').Router()
const {Payment, Order, Order_BubbleTea} = require('../db/models')

module.exports = router

// GET api/checkout
router.get('/', async (req, res, next) => {

  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      const checkout = await Payment.findAll()
      res.json(checkout, authData)
    }
  })

  try {
    const checkout = await Payment.findAll()
    res.json(checkout)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
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
    let orderId = 0
    req.body.arrItem.map(el => {
      let line = {}
      orderId = order.id
      line.orderId = order.id
      line.bubbleTeaId = el.info.id
      line.bubbleTeaPrice = el.info.price
      line.bubbleTeaQuantity = req.body.qty
      values.push(line)
      return line
    })
    // 2) save to Order_BubbleTea table
    const order_bubbleTea = Order_BubbleTea.bulkCreate(values, {
      returning: true
    })

    // 3) save to payment
    if (order_bubbleTea) {
      console.log('id', req.body.selectedPayment.tokenId)
      const payment = {
        tokenId: req.body.selectedPayment.tokenId,
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

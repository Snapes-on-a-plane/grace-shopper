// NL: This file will have the Order data model.

const Sequelize = require('sequelize')
const db = require('../db')
//const Order_BubbleTea = require('./Order_BubbleTea')
const Op = Sequelize.Op

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.INTEGER // NL: Price value will be stored in cents, not dollars.
  },
  totalQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Order

// NL: This file will have the Order_BubbleTea data model.

const Sequelize = require('sequelize')
const db = require('../db')

const Order_BubbleTea = db.define('Order_BubbleTea', {
  orderId: {
    type: Sequelize.INTEGER
  },
  bubbleTeaId: {
    type: Sequelize.INTEGER
  },
  bubbleTeaPrice: {
    type: Sequelize.INTEGER, // NL: Price value will be stored in cents, not dollars.
    validate: {
      min: 0
    }
  },
  bubbleTeaQuantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Order_BubbleTea

// NL: This file will have the Order data model.

const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0
  },
  items: {
    type: Sequelize.ARRAY()
  }
})

module.exports = Order

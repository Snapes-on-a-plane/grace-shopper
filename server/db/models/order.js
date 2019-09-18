// NL: This file will have the Order data model.

const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0
  },
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Order

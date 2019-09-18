// NL: This file will have the Order data model.

const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  itemName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  itemPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Order

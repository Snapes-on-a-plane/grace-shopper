const Sequelize = require('sequelize')
const db = require('../db')

const Payment = db.define('payment', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  paymentType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['VISA', 'MASTERCARD', 'DISCOVER', 'AmericanExpress']]
    }
  },
  cartNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cvv: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  expiredDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAfter: '2010-01-01',
      isBefore: '2030-01-01'
    }
  }
})

module.exports = Payment

const Sequelize = require('sequelize')
const db = require('../db')

const BubbleTea = db.define('bubbleTea', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  picture: {
    type: Sequelize.STRING,
    defaultValue:
      'https://lh3.googleusercontent.com/p/AF1QipPNqmo65hyB5bh3YuHOCmfZvCXTDUstdDoPwBhd=s1600-w5006'
  },
  price: {
    type: Sequelize.INTEGER, // NL: Price value will be stored in cents, not dollars.
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  rating: {
    type: Sequelize.DECIMAL,
    validate: {
      isFloat: true,
      min: 1,
      max: 5
    }
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  // types: {
  //   type: Sequelize.ARRAY(Sequelize.TEXT)
  // },
  user_ratings_total: {
    type: Sequelize.INTEGER
  }
})

module.exports = BubbleTea

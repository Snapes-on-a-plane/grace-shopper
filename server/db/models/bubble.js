const Sequelize = require('sequelize')
const db = require('../db')

const Bubble = db.define('bubble', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true
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
    type: Sequelize.FLOAT,
    defaultValue: 3.5,
    allowNull: false,
    validate: {
      notNull: true
    }
  },
  rating: {
    type: Sequelize.DECIMAL,
    validate: {
      isFloat: true
    }
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  types: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  user_ratings_total: {
    type: Sequelize.INTEGER
  }
})

module.exports = Bubble

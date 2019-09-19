const User = require('./user')
const Order = require('./order')
const Bubble = require('./bubble')
const Payment = require('./payment')

//Initial: S.C. Comment: Associations
Bubble.belongsToMany(Order, {through: 'Order-Bubble'}) // NL: Bubble-To-Order is Many-To-Many association

User.hasMany(Order)
Order.belongsTo(User)

// KL add for checkout.
Payment.belongsTo(User)
User.hasMany(Payment)

module.exports = {
  User,
  Order,
  Bubble,
  Payment
}

const User = require('./user')
const Order = require('./order')
const Bubble = require('./bubble')

//Initial: S.C. Comment: Associations
Order.hasMany(Bubble)
Bubble.belongsToMany(Order, {through: 'Order-Bubble'}) // NL: Bubble-To-Order is Many-To-Many association

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Order,
  Bubble
}

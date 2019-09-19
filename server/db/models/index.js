const User = require('./user')
const Order = require('./order')
const BubbleTea = require('./bubbleTea')
const Order_BubbleTea = require('./order_BubbleTea')
const Payment = require('./payment')


//Initial: S.C. Comment: Associations
BubbleTea.belongsToMany(Order, {through: 'Order_BubbleTea'}) // NL: Order-To-BubbleTea is Many-To-Many association
Order.belongsToMany(BubbleTea, {through: 'Order_BubbleTea'}) // NL: Order-To-BubbleTea is Many-To-Many association

User.hasMany(Order)
Order.belongsTo(User)


// KL add for checkout.
Payment.belongsTo(User)
User.hasMany(Payment)


module.exports = {
  User,
  Order,
  BubbleTea,
  Order_BubbleTea,
  Payment
}

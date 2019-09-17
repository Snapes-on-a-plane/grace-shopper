const User = require('./user')
const Order = require('./order')
const Bubble = require('./bubble')

//Initial: S.C. Comment: Associations
// Order.hasMany(Bubble);
// Bubble.belongsTo(Order);

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Order,
  Bubble
}

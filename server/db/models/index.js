const User = require('./user')
const Bubble = require('./bubble');
const Order = require('./order');

//Initial: S.C. Comment: Associations
Order.hasMany(Bubble);
Bubble.belongsTo(Order);

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  User,
  Order,
  Bubble
}

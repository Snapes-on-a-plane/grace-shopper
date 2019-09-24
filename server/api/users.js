const router = require('express').Router()
const {User} = require('../db/models')
const secureRoutes = require('./securityHelpers')
module.exports = router

router.post('/', secureRoutes, (req, res) => {
  req.session.orders = req.body
  req.session.save()
})

router.get('/', secureRoutes, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/alluser', secureRoutes, (req, res) => {
  if (req.session.orders) {
    res.json(req.session.orders)
  }
})

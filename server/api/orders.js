const router = require('express').Router()
const {Order} = require('../db/models')
const secureRoutes = require('./securityHelpers')

router.post('/', secureRoutes, async (req, res) => {
  req.session.orders = req.body
  console.log(req.session.orders[0].info)
})

module.exports = router

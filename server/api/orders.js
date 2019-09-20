const router = require('express').Router()
const {Order} = require('../db/models')

router.post('/', async (req, res, next) => {
  console.log('helo')
})

module.exports = router

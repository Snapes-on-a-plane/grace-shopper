const router = require('express').Router()
const {Order} = require('../db/models')

router.post('/', async (req, res) => {
  console.log('order')
})

module.exports = router

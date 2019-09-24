const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.post('/', (req, res) => {
  req.session.orders = req.body
  req.session.save()
})

//GET REQUEST FOR /USERS
router.get('/', async (req, res, next) => {
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

//GET REQUEST FOR /USERS/ALLUSER
router.get('/alluser', (req, res) => {
  console.log(req.session)
  if (req.session) {
    res.json(req.session.orders)
  }
})

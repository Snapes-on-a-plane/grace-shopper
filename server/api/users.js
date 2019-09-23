const router = require('express').Router()
const {User} = require('../db/models')
const checkAuth = require('./securityHelpers')
module.exports = router

router.get('/', checkAuth, async (req, res, next) => {
  jwt.verify(req.token, 'secretkey', async err => {
    if (err) {
      res.sendStatus(403)
    } else {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    }
  })
  // try {
  //   const users = await User.findAll({
  //     // explicitly select only the id and email fields - even though
  //     // users' passwords are encrypted, it won't help if we just
  //     // send everything to anyone who asks!
  //     attributes: ['id', 'email']
  //   })
  //   res.json(users)
  // } catch (err) {
  //   next(err)
  // }
})

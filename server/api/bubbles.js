// NL: This file will have all the routes related to Bubble data model.

const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {BubbleTea} = require('../db/models')
const checkAuth = require('./securityHelpers')
module.exports = router

// GET api/bubbles

//router.get('/', async(req, res) => {
// try {
//   const bubbles = await BubbleTea.findAll()
//   res.json(bubbles)
// } catch (error) {
//   next(error)
// }
//   jwt.verify(req.token, 'secretkey', async(err, authData) => {
//     if(err) {
//       res.sendStatus(403);
//     } else {
//     const bubbles = await BubbleTea.findAll()
//     res.json(bubbles, authData)
//     }
//   });
// });

// const checkAuth = (req, res, next) => {
//   try {
//       const token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_KEY);
//       req.userData = decoded;
//       next();
//   } catch (error) {
//       return res.status(401).json({
//           message: 'Auth failed'
//       });
//   }
// };

router.get('/', checkAuth, async (req, res) => {
  try {
    const bubbles = await BubbleTea.findAll()
    res.json(bubbles)
  } catch (error) {
    console.log(error)
  }
  // jwt.verify(req.token, 'secretkey', async(err) => {
  //   if(err) {
  //     res.sendStatus(403);
  //   } else {
  //   const bubbles = await BubbleTea.findAll()
  //   res.json(bubbles)
  //   }
  // });
})

// GET api/bubbles/:bubbleId
router.get('/:bubbleId', async (req, res, next) => {
  try {
    const aBubble = await BubbleTea.findById(req.params.bubbleId)
    res.json(aBubble)
  } catch (err) {
    next(err)
  }
})

// function verifyToken(req, res, next) {
//   //send the token in the header
//   const bearerHeader = req.headers['authorization'];
//   if(typeof bearerHeader !== 'undefined') {
//     // Split at the space
//     const bearer = bearerHeader.split(' ');
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     next();
//   } else {
//     // Forbidden from the peoples
//     res.sendStatus(403);
//   }

// }

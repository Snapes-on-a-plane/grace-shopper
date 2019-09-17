// NL: This file will have all the routes related to Bubble data model.

const router = require('express').Router()
const {Bubble} = require('../db/models')
module.exports = router

// GET api/bubbles
router.get('/', async (req, res, next) => {
  try {
    const bubbles = await Bubble.findAll()
    res.json(bubbles)
  } catch (err) {
    next(err)
  }
})

// GET api/bubbles/:bubbleId
router.get('/:bubbleId', async (req, res, next) => {
  try {
    const aBubble = await Bubble.findById(req.params.bubbleId)
    res.json(aBubble)
  } catch (err) {
    next(err)
  }
})

// NL: This file will have all the routes related to Bubble data model.

const router = require('express').Router()
const {BubbleTea} = require('../db/models')
module.exports = router

// GET api/bubbles
router.get('/', async (req, res, next) => {
  try {
    const bubbles = await BubbleTea.findAll()
    console.log(bubbles)
    res.json(bubbles)
  } catch (err) {
    next(err)
  }
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

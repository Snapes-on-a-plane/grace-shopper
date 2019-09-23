// NL: This file will have all the routes related to Bubble data model.

const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {BubbleTea} = require('../db/models')
const checkAuth = require('./securityHelpers')
module.exports = router

const Sequelize = require('sequelize')
const Op = Sequelize.Op

// GET api/bubbles

router.get('/', checkAuth, async (req, res) => {
  try {
    const bubbles = await BubbleTea.findAll()
    res.json(bubbles)
  } catch (err) {
    next(err)
  }
})

// GET api/bubbles/popular
router.get('/popular', async (req, res, next) => {
  try {
    const bubbles = await BubbleTea.findAll({
      where: {
        rating: {
          [Op.gte]: 4.6
        }
      }
    })
    res.json(bubbles)
  } catch (error) {
    console.log(error)
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

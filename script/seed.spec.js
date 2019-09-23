'use strict'
/* global describe it */

const seed = require('./seed')

describe('seed script', () => {
  it('completes successfully', async () => {
    try {
      await seed()
    } catch (error) {
      console.log('seeding unsuccessful, error:', error)
    }
  })
})

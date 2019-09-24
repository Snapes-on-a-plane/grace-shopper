/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const BubbleTea = db.model('bubbleTea')

describe('Bubble tea routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/bubbles/', () => {
    it('GET /api/bubbles', async () => {
      const res = await request(app)
        .get('/api/bubbles')
        .expect(302)

      expect(res.body).to.be.an('object')
    })
  }) // end describe('/api/bubbles')
}) // end describe('Bubble tea routes')

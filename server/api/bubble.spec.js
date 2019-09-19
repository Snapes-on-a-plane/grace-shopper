/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Bubble = db.model('bubble')

describe('Bubble tea routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/bubbles/', () => {
    it('GET /api/bubbles', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

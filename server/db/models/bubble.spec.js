const {expect} = require('chai')
const db = require('../index')
const Bubble = db.model('bubble')

describe('Bubble tea model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
}) // end describe('User model')

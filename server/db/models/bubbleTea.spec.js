const {expect} = require('chai')
const db = require('../index')
const BubbleTea = db.model('bubbleTea')

describe('Bubble tea model', () => {
  describe('Validations', () => {
    // name:
    it('requires `name`', async () => {
      const bubbleTea = BubbleTea.build()
      try {
        await bubbleTea.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires `name` to not be an empty string', async () => {
      const bubbleTea = BubbleTea.build({
        name: ''
      })

      try {
        await bubbleTea.validate()
        throw Error(
          'validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    // price:
    it('requires `price`', async () => {
      const bubbleTea = BubbleTea.build()
      try {
        await bubbleTea.validate()
        throw Error(
          'validation was successful but should have failed without `price`'
        )
      } catch (err) {
        expect(err.message).to.contain('price cannot be null')
      }
    })

    it('requires `price` to be a positive value including 0', async () => {
      const bubbleTea = BubbleTea.build({
        price: -1000
      })

      try {
        await bubbleTea.validate()
        throw Error(
          'validation was successful but should have failed if price is a negative value'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    // rating:
    it('requires `rating` to be a float value between 1-5, does not accept value < 1', async () => {
      const bubbleTea = BubbleTea.build({
        rating: 0
      })

      try {
        await bubbleTea.validate()
        throw Error(
          'validation was successful but should have failed if rating is 0'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    it('requires `rating` to be a float value between 1-5, does not accept value > 5', async () => {
      const bubbleTea = BubbleTea.build({
        rating: 10
      })

      try {
        await bubbleTea.validate()
        throw Error(
          'validation was successful but should have failed if rating is 10'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })
  })
})

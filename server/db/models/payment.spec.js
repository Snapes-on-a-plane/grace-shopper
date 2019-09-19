const {expect} = require('chai')
const db = require('../index')
const Payment = db.model('payment')

describe('Payment model', () => {
  describe('Validations', () => {
    // paymentType:
    it('requires `paymentType`', async () => {
      const payment = Payment.build()
      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed without `paymentType`'
        )
      } catch (err) {
        expect(err.message).to.contain('paymentType cannot be null')
      }
    })

    it('requires `paymentType` to not be an empty string', async () => {
      const payment = Payment.build({
        paymentType: ''
      })

      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed if paymentType is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    it('requires `paymentType` is the type that our system accepts', async () => {
      const payment = Payment.build({
        paymentType: 'ABCD'
      })

      try {
        await payment.validate()
        throw Error(
          "validation was successful but should have failed if paymentType is not in ['VISA', 'MASTERCARD', 'DISCOVER', 'AmericanExpress']"
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    // cartNumber
    it('requires `cartNumber`', async () => {
      const payment = Payment.build()
      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed without `cartNumber`'
        )
      } catch (err) {
        expect(err.message).to.contain('cartNumber cannot be null')
      }
    })

    it('requires `cartNumber` to not be an empty string', async () => {
      const payment = Payment.build({
        cartNumber: ''
      })

      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed if cartNumber is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    // cvv
    it('requires `cvv`', async () => {
      const payment = Payment.build()
      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed without `cvv`'
        )
      } catch (err) {
        expect(err.message).to.contain('cvv cannot be null')
      }
    })

    it('requires `cvv` to not be an empty string', async () => {
      const payment = Payment.build({
        cvv: ''
      })

      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed if cvv is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    // expiredDate
    it('requires `expiredDate`', async () => {
      const payment = Payment.build()
      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed without `expiredDate`'
        )
      } catch (err) {
        expect(err.message).to.contain('expiredDate cannot be null')
      }
    })

    it('requires `expiredDate` to be in the system required date range', async () => {
      const payment = Payment.build({
        expiredDate: new Date('October 13, 2010 11:13:00') //new Date("October 13, 1000 11:13:00")
      })

      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed if expiredDate is not in the system required date range'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })
  })
})

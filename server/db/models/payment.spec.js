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
          "validation was successful but should have failed if paymentType is not in ['visa', 'mastercard', 'discover', 'amex']"
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

    // month
    it('requires `expiredMonth`', async () => {
      const payment = Payment.build()
      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed without `expiredMonth`'
        )
      } catch (err) {
        expect(err.message).to.contain('expiredMonth cannot be null')
      }
    })


    it('requires `expiredMonth` to not be an empty string', async () => {
      const payment = Payment.build({
        expiredMonth: ''
      })

      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed if expiredMonth is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })
    // end month

    // year
    it('requires `expiredYear`', async () => {
      const payment = Payment.build()
      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed without `expiredYear`'
        )
      } catch (err) {
        expect(err.message).to.contain('expiredYear cannot be null')
      }
    })

    it('requires `expiredYear` to not be an empty string', async () => {
      const payment = Payment.build({
        expiredYear: ''
      })

      try {
        await payment.validate()
        throw Error(
          'validation was successful but should have failed if expiredYear is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })
    

  })
})

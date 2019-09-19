import React from 'react'
import {connect} from 'react-redux'
//const payform = require('payform')

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      existingPayment: [],
      selectedPayment: {},
      orderId: 0,
      errorMsg: ''
    }
  }

  render() {
    const cardNum = '4242424242424242'
    // const ret = payform.validateCardNumber(cardNum)
    // const type = payform.parseCardType(cardNum)
    console.log('checkout', ret, type)

    const selectedPayment = this.state.selectedPayment
    return (
      <div className="form-div">
        <h2>Order Checkout</h2>
        <form>
          <label htmlFor="cartNumber" text-align="right">
            Credit Card Number
          </label>
          <input
            type="text"
            id="cartNumber"
            name="cartNumber"
            placeholder="Credit Card number.."
          />

          <label htmlFor="cvv">CVV Number</label>
          <input type="text" id="cvv" name="cvv" placeholder="CVV number.." />

          <label htmlFor="expiredDate">Expired Date</label>
          <input
            type="text"
            id="expiredDate"
            name="expiredDate"
            placeholder="Expired Date.."
          />

          <label htmlFor="country">Credit Card Type</label>
          <select id="paymentType" name="paymentType">
            <option value="VISA">VISA</option>
            <option value="MASTERCARD">MasterCard</option>
            <option value="DISCOVER">Discover</option>
            <option value="AmericanExpress">American Express</option>
          </select>

          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    existingPayment: state.existingPayment,
    selectedPayment: state.selectedPayment,
    orderId: state.orderId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCheckOut: selectedPayment => dispatch(getCheckOut(selectedPayment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

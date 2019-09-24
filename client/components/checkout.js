import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {getCheckOut} from '../store'
import {isThisQuarter} from 'date-fns'
import {CardElement, injectStripe} from 'react-stripe-elements'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMsg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submit = this.submit.bind(this)
    this.isNumber = this.isNumber.bind(this)
    this.centsToDollars = this.centsToDollars.bind(this)
  }

  async submit() {
    this.props.stripe.createToken({name: 'Kate'}).then(token => {
      if (token.error !== undefined && token.error.message !== undefined) {
        this.setState({errorMsg: 'Error: ' + token.error.message})
      } else {
        this.handleSubmit(token.id)
        this.setState({errorMsg: 'Order Complete!'})
      }
    })
  }

  async handleSubmit(id) {
    console.log('token id good', id)
    const selectedPayment = {tokenId: id}
    await this.props.getCheckOut({
      selectedPayment,
      orderId: this.props.orderId,
      arrItem: this.props.arrItem,
      price: this.props.price,
      qty: this.props.qty
    })
    // redirect
  }

  validate(evt) {
    let name = evt.target.name.value
    let cartNumber = evt.target.cartNumber.value
    let cvv = evt.target.cvv.value
    const dateM = evt.target.expiredDateMonth.value
    const dateY = evt.target.expiredDateYear.value

    if (!name || name.lenght <= 0) {
      return 'Invalid name.'
    }
    //cartNumber = '4242424242424242'
    if (!payform.validateCardNumber(cartNumber)) {
      return 'Invalid card number.'
    }
    const type = payform.parseCardType(cartNumber)
    if (
      ['visa', 'amex', 'mastercard', 'discover'].indexOf(type.toLowerCase() < 0)
    ) {
      return 'Invalid card type.'
    }
    if (!payform.validateCardCVC(cvv)) {
      return 'Invalid secret Code.'
    }
    if (!payform.validateCardExpiry(dateM, dateY)) {
      return 'Invalid expired date.'
    }
    return ''
  }

  isNumber(evt) {
    const field = document.getElementById(evt.target.name)
    const value = field.value
    evt = evt ? evt : window.event
    var charCode = evt.which ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if (field.value === undefined) {
        field.value = ''
      } else {
        field.value = value.substring(0, value.length - 1)
      }
      return false
    }
    return true
  }
  centsToDollars(cents) {
    const dollars = (cents / 100).toFixed(2)
    return dollars
  }

  render() {
    return (
      <div className="form-div">
        <h2>
          Credit Card Checkout:{' '}
          <img src="./images/cuteBubble.png" alt="" width="50" height="50px" />
        </h2>
        <div className="form-header">
          <div className="totalArea">
            <span>Total Qty: {this.props.qty}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>Total Price: ${this.centsToDollars(this.props.price)}</span>
          </div>
          <div className="bigtable">
            <Table striped bordered hover>
              <thead className="checkoutTable">
                <tr>
                  <th>Item Name</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {this.props.arrItem
                  ? this.props.arrItem.map((el, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{el.info.name}</td>
                          <td>{el.qty}</td>
                          <td>${this.centsToDollars(el.info.price)}</td>
                          <td>
                            ${this.centsToDollars(el.qty * el.info.price)}
                          </td>
                        </tr>
                      )
                    })
                  : 'empty'}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="checkout">
          <p className="errorMsg">{this.state.errorMsg}</p>
          <CardElement />
          <button onClick={this.submit} className="btn-checkout">
            Place Order
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedPayment: state.selectedPayment,
    orderId: state.orderId,
    arrItem: state.checkout.orderItem,
    price: state.checkout.totalPrice,
    qty: state.checkout.totalQty
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCheckOut: order => dispatch(getCheckOut(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectStripe(Checkout)
)

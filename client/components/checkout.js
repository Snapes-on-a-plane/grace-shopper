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
            <span>Total Price: ${this.props.price}</span>
          </div>
          <div>
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
                          <td>{el.info.price}</td>
                          <td>{el.qty * el.info.price}</td>
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

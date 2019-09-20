import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
const payform = require('payform')

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      existingPayment: [],
      selectedPayment: {},
      orderId: 0,
      errorMsg: ''
    }
    this.handleCardNumChange = this.handleCardNumChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    console.log('component did mount')
  }

  handleCardNumChange(evt) {
    const cardNum = evt.target.value
    const ret = payform.validateCardNumber(cardNum)
    if (!ret) {
      this.setState({errorMsg: 'Error: Card number invalid.'})
    } else {
      this.setState({errorMsg: ''})
    }
  }

  handleKeyPress(evt) {
    //console.log('kedd', evt.key)
    if (
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(evt.key) < 0
    ) {
      return false
    }
  }

  render() {
    //const cardNum = '4242424242424242'
    // const ret = payform.validateCardNumber(cardNum)
    //const type = payform.parseCardType(cardNum)
    //console.log('checkout', ret, type)
    //const selectedPayment = this.state.selectedPayment
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
        <p>
          {this.state.errorMsg}
          <hr />
        </p>
        <form>
          <label htmlFor="name" text-align="right">
            CardHolder's Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="CardHolder's name.."
          />
          <label htmlFor="cartNumber" text-align="right">
            Credit Card Number
          </label>
          <input
            type="text"
            id="cartNumber"
            name="cartNumber"
            placeholder="Credit Card number.."
            onChange={this.handleCardNumChange}
            onKeyPress={this.handleKeyPress}
          />
          <label htmlFor="cvv">Secret Code(CVV/CVC/CID)</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="CVV/CVC/CID number.."
            onBlur={this.handleCardNumBlur}
          />
          <label htmlFor="expiredDate">Expired Date</label>
          <div className="form-div-select">
            <select>
              <option value="01">January</option>
              <option value="02">February </option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09" selected>
                September
              </option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select>
              <option value="10"> 2010</option>
              <option value="11"> 2011</option>
              <option value="12"> 2012</option>
              <option value="13"> 2013</option>
              <option value="14"> 2014</option>
              <option value="15"> 2015</option>
              <option value="16"> 2016</option>
              <option value="17"> 2017</option>
              <option value="18"> 2018</option>
              <option value="19" selected>
                {' '}
                2019
              </option>
              <option value="20"> 2020</option>
              <option value="21"> 2021</option>
              <option value="22"> 2022</option>
              <option value="23"> 2023</option>
              <option value="24"> 2024</option>
              <option value="25"> 2025</option>
              <option value="26"> 2026</option>
              <option value="27"> 2027</option>
              <option value="28"> 2028</option>
              <option value="29"> 2029</option>
              <option value="30"> 2030</option>
            </select>
          </div>
          <div className="form-div-img">
            <label htmlFor="CartType">Credit Card Type &nbsp;&nbsp;</label>
            <img src="./images/visa.png" alt="" width="60" height="30" />&nbsp;
            <img
              src="./images/mastercard.png"
              alt=""
              width="60"
              height="30"
            />&nbsp;
            <img
              src="./images/discover.jpg"
              alt=""
              width="60"
              height="30"
            />&nbsp;
            <img
              src="./images/americanexpress.png"
              alt=""
              width="60"
              height="30"
            />&nbsp;
          </div>
          <br />
          <input type="submit" value="Place Order" /> &nbsp;&nbsp;
          <input type="button" value="Cancel" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    existingPayment: state.existingPayment,
    selectedPayment: state.selectedPayment,
    orderId: state.orderId,
    arrItem: state.checkout.orderItem,
    price: state.checkout.totalPrice,
    qty: state.checkout.totalQty
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCheckOut: selectedPayment => dispatch(getCheckOut(selectedPayment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

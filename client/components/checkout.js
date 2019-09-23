import React from 'react'
import {connect} from 'react-redux'
import payform from 'payform'
import {Table} from 'react-bootstrap'
import {getCheckOut} from '../store'
import {isThisQuarter} from 'date-fns'


class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      errorMsg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isNumber = this.isNumber.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    // const ret = this.validate(event);
    // console.log("ret", ret)
    // if (ret.length  > 0){
    //   console.log("in h")
    //    this.setState({errorMsg: ret});

    //    return false;
    // }

    const selectedPayment = {
      name: 'kate',
      paymentType: 'visa',
      cartNumber: '232',
      cvv: '234',
      expireDate: '2020-10-10'
    }
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

  render() {
    return (
      <div className="form-div">
        <h2>
          Credit Card Checkout:{' '}
          <img src="./images/cuteBubble.png" alt="" width="50" height="50px" />
          <p className="errorMsg">{this.state.errorMsg}</p>
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

        <form onSubmit={this.handleSubmit}>
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
            onKeyPress={this.isNumber}
          />
          <label htmlFor="cvv">Secret Code(CVV/CVC/CID)</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="CVV/CVC/CID number.."
            onKeyPress={this.isNumber}
          />
          <label htmlFor="expiredDate">Expired Date</label>
          <div className="form-div-select">
            <select name="expiredDateMonth" id="expiredDateMonth">
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
            <select name="expiredDateYear" id="expiredDateYear">
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
          {/* <input type="button" value="Cancel" /> */}
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

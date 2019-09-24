import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleBubble from './singleBubble'
import {displayAllBubbles, gotOrder} from '../store'
import {Toast} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Menu extends Component {
  constructor() {
    super()
    this.state = {
      arrItem: [],
      price: 0,
      quantity: 0,
      minusPrice: 0,
      minusQuantity: 0
    }
    this.OrderCheckout = this.OrderCheckout.bind(this)
  }
  async componentDidMount() {
    await this.props.displayAllBubbles()
    const {data} = await axios.get('/api/users/alluser')
    const qty = data.reduce((acc, item) => {
      acc += Number(item.qty)
      return acc
    }, 0)
    const newPrice = data.reduce((acc, item) => {
      acc += item.info.price * Number(item.qty)
      return acc
    }, 0)
    this.setState({arrItem: data, price: newPrice, quantity: qty})
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.arrItem.length !== prevState.arrItem.length &&
      this.state.minusPrice > 0
    ) {
      let minusp = this.state.minusPrice
      let minusq = this.state.minusQuantity
      this.setState({
        price: this.state.price - minusp,
        quantity: this.state.quantity - minusq,
        minusPrice: 0,
        minusQuantity: 0
      })
    }
    if (
      this.state.arrItem.length !== prevState.arrItem.length &&
      this.state.minusPrice === 0
    ) {
      this.calPriceQty(
        this.props.item.price,
        this.props.qty,
        this.props.tempQty
      )
    }
  }

  renderMenu() {
    if (this.props.bubbles) {
      return this.props.bubbles.map((bubble, ind) => (
        <SingleBubble key={ind} bubbleInfo={bubble} update={this.update} />
      ))
    } else {
      return <h1>loading</h1>
    }
  }

  update = (item, qty) => {
    if (qty) {
      this.setState({arrItem: [...this.state.arrItem, {info: item, qty: qty}]})
    }
  }

  remove = i => {
    const subPrice =
      this.state.arrItem[i].info.price * this.state.arrItem[i].qty
    const subQty = this.state.arrItem[i].qty
    this.setState(state => {
      const arrItem = state.arrItem.filter((item, ind) => ind !== i)
      const minusPrice = subPrice
      const minusQuantity = Number(subQty)
      return {
        arrItem,
        minusPrice,
        minusQuantity
      }
    })
  }

  calPriceQty = (price, qty) => {
    if (qty) {
      let curPrice = qty * price
      this.setState({
        quantity: this.state.quantity + Number(qty),
        price: this.state.price + curPrice
      })
    }
  }

  OrderCheckout() {
    this.props.orderCheckout(
      this.state.arrItem,
      this.state.price,
      this.state.quantity
    )
    axios.post('/api/users', this.state.arrItem)
    this.setState({arrItem: [], price: 0, quantity: 0})
  }

  render() {
    const {arrItem} = this.state
    const {price, quantity} = this.state
    return (
      <div>
        <div className="all_bubble_styling">{this.renderMenu()}</div>
        <div className="toast">
          {arrItem
            ? arrItem.map((bubble, i) => {
                return (
                  <Toast key={i} className="toasts">
                    <Toast.Header>
                      <strong className="mr-auto">{bubble.info.name}</strong>
                    </Toast.Header>
                    <Toast.Body>
                      Price: ${(bubble.info.price / 100 * bubble.qty).toFixed(
                        2
                      )}{' '}
                      Qty: {bubble.qty} qty
                    </Toast.Body>
                    <button
                      onClick={() => this.remove(i)}
                      className="deleteBtn"
                      type="submit"
                    >
                      <strong>Remove</strong>
                    </button>
                  </Toast>
                )
              })
            : ''}
        </div>
        <div>
          <div>
            <h1
              style={{
                color: 'lightyellow',
                marginTop: '31px',
                textShadow:
                  '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
              }}
            >
              Bubble Order:
            </h1>
            <div className="total">
              <h2>Total Price:</h2>
              <p style={{fontSize: '20px'}}>${(price / 100).toFixed(2)}</p>
              <h2>Total Quantity:</h2>
              <p style={{fontSize: '20px'}}>{quantity} qty</p>
            </div>
            <br />
            <div className="orderBtn">
              <Link to="/checkout">
                {' '}
                <button
                  className="btn"
                  type="button"
                  onClick={this.OrderCheckout}
                >
                  Submit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bubbles: state.bubble.bubbles,
    item: state.order.item,
    qty: state.order.qty
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayAllBubbles: () => dispatch(displayAllBubbles()),
    orderCheckout: (order, price, qty) => dispatch(gotOrder(order, price, qty))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

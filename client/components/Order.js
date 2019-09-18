import React from 'react'
import Table from 'react-bootstrap/Table'
import {connect} from 'react-redux'
import {gotAllOrder} from '../store'

//need to change the Total Price by quantity!!! but how? still working on it

class Order extends React.Component {
  constructor() {
    super()
    this.state = {price: 0, quantity: 0, tempQty: null}
  }

  componentDidMount() {
    this.props.actionOrder()
  }

  componentDidUpdate() {
    console.log('component did update')
  }

  // checking= (e) => {
  //   console.log(this.state.price)
  //   // if(e.target.checked) {
  //   //   const value = e.target.value
  //   //   console.log('-----',e.target.quantity)
  //   //   this.setState({price: this.state.price + Number(value), orderItem: [...this.state.orderItem, e.target.name]});
  //   // } else if(!e.target.checked && this.state.orderItem.includes(e.target.name)) {
  //   //   const value = e.target.value
  //   //   const index = this.state.orderItem.indexOf(e.target.name);
  //   //   this.state.orderItem.splice(index, 1);
  //   //   this.setState({price: this.state.price - Number(value)})
  //   // }
  // };

  quantityChange = (e, price) => {
    const qty = e.target.value
    let temp = this.state.tempQty
    if (qty) {
      let curPrice = qty * price
      let prevPrice = temp * price
      this.setState({
        quantity: this.state.quantity + Number(qty) - temp,
        tempQty: null,
        price: this.state.price + curPrice - prevPrice
      })
    }
  }

  trackQty = e => {
    this.setState({tempQty: e.target.value})
  }

  render() {
    const {orders} = this.props
    const {price, quantity} = this.state
    return (
      <div>
        <form action="/api/order/form" method="post">
          <h1
            style={{
              color: 'lightyellow',
              marginTop: '31px',
              textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
            }}
          >
            Bubble Order Form:
          </h1>
          <div className="orderForm">
            <img style={{borderRadius: '10px'}} src="./images/bubbleTeas.png" />
            <hr />
            <p style={{textAlign: 'left'}}>
              <i>@Boba Guys Images</i>
            </p>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Bubble Tea Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders
                ? orders.map(order => {
                    return (
                      <tr key={order.id}>
                        <td>
                          {order.name}
                          <img
                            style={{
                              width: '30px',
                              height: '40px',
                              marginLeft: '5px'
                            }}
                            src="./images/cuteBubble.png"
                          />
                        </td>
                        <td>${order.totalPrice}</td>
                        <td>
                          <input
                            onBlur={e =>
                              this.quantityChange(e, order.totalPrice)
                            }
                            onFocus={this.trackQty}
                            style={{
                              width: '50px',
                              height: '40px',
                              fontSize: '20px'
                            }}
                            name={order.name}
                            type="number"
                            max="10"
                            min="0"
                            placeholder="0"
                          />{' '}
                          Tea
                        </td>
                      </tr>
                    )
                  })
                : ''}
            </tbody>
          </Table>
          <br />
          <div className="total">
            <h2>Total Price:</h2>
            <p style={{fontSize: '20px'}}>${price}</p>
            <h2>Total Quantity:</h2>
            <p style={{fontSize: '20px'}}>{quantity} qty</p>
          </div>
          <br />
          <div className="orderBtn">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actionOrder: () => dispatch(gotAllOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)

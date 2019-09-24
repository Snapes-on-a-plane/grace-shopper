import axios from 'axios'

const initialState = {
  existingPayments: [],
  selectedPayment: {},
  orderId: 0,
  totalPrice: 0,
  totalQty: 0,
  orderItem: []
}

const GETORDER = 'GETORDER'
const getOrder = (order, totalPrice, totalQty) => ({
  type: 'GETORDER',
  order,
  totalPrice,
  totalQty
})
export const gotOrder = (order, price, qty) => dispatch => {
  dispatch(getOrder(order, price, qty))
}
// payment
const PAYMENT = 'PAYMENT'
const gotPayments = existingPayments => ({
  type: PAYMENT,
  existingPayments
})

export const getPayments = () => {
  return async dispath => {
    try {
      const res = await axios.get(`/api/checkout`)
      dispath(gotPayments(res.data))
    } catch (err) {
      console.log('Getting payment error:', err)
    }
  }
}

// checkout
const CHECKOUT = 'CHECKOUT'
const gotCheckOut = selectedPayment => ({
  type: CHECKOUT,
  selectedPayment
})

export const getCheckOut = order => {
  return async dispath => {
    try {
      console.log('order', order)
      const res = await axios.post(`/api/checkout/add`, order)
      dispath(gotCheckOut(res))
    } catch (err) {
      console.log('Checkout error:', err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECKOUT:
      return {
        ...state,
        selectedPayment: action.selectedPayment
      }
    case PAYMENT:
      return {
        ...state,
        existingPayments: action.existingPayments
      }
    case GETORDER:
      return {
        ...state,
        orderItem: action.order,
        totalPrice: action.totalPrice,
        totalQty: action.totalQty
      }
    default:
      return state
  }
}

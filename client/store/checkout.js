import axios from 'axios'

const initialState = {
  existingPayments: [],
  selectedPayment: {},
  orderId: 0
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

export const getCheckOut = selectedPayment => {
  return async dispath => {
    try {
      const res = await axios.post(`/api/checkout/add`, selectedPayment)
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
    default:
      return state
  }
}

import axios from 'axios'

//action types
const GET_ALL_ORDER = 'GET_ALL_ORDER'
const ORDER_ITEM = 'ORDER_ITEM'
const QTY = 'QTY'

//action creator
const getAllOrder = orders => {
  return {
    type: 'GET_ALL_ORDER',
    orders
  }
}

const getOrderItem = order => {
  return {
    type: 'ORDER_ITEM',
    order
  }
}

const getQty = qty => {
  return {
    type: 'QTY',
    qty
  }
}

//thunk
export const gotAllOrder = () => async dispatch => {
  const {data} = await axios.get('/api/orders')
  dispatch(getAllOrder(data))
}
export const gotOrderItem = item => dispatch => {
  dispatch(getOrderItem(item))
}
export const gotQty = qty => dispatch => {
  dispatch(getQty(qty))
}

//initialState
const initialState = {
  orders: [],
  item: {},
  qty: 0
}

//reducer
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDER:
      return {
        ...state,
        orders: action.orders
      }
    case ORDER_ITEM:
      return {
        ...state,
        item: action.order
      }
    case QTY:
      return {
        ...state,
        qty: action.qty
      }
    default:
      return state
  }
}

export default orderReducer

import axios from 'axios'

//action types
const GET_ALL_ORDER = 'GET_ALL_ORDER'

//action creator
const getAllOrder = orders => {
  return {
    type: 'GET_ALL_ORDER',
    orders
  }
}

//thunk
export const gotAllOrder = () => async dispatch => {
  const {data} = await axios.get('/api/orders')
  dispatch(getAllOrder(data))
}

//initialState
const initialState = {
  orders: []
}

//reducer
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDER:
      return {
        ...state,
        orders: action.orders
      }
    default:
      return state
  }
}

export default orderReducer

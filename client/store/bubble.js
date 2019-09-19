import axios from 'axios'
import history from '../history'
import {combineReducers} from 'redux'

const GET_ALL_BUBBLES = 'GET_ALL_BUBBLES'
const GET_POPULAR_BUBBLES = 'GET_POPULAR_BUBBLES'

const getAllBubbles = bubbles => ({
  type: GET_ALL_BUBBLES,
  bubbles
})
const getPopularBubbles = bubbles => ({
  type: GET_POPULAR_BUBBLES,
  bubbles
})

const initialState = {
  bubbles: [],
  popularBubbles: []
}

export const displayAllBubbles = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/bubbles')
    dispatch(getAllBubbles(data))
  } catch (err) {
    console.error(err)
  }
}

export const displayPopularBubbles = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/bubbles/popular')
    dispatch(getPopularBubbles(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BUBBLES:
      return {
        ...state,
        bubbles: action.bubbles
      }
    case GET_POPULAR_BUBBLES:
      return {
        ...state,
        popularBubbles: action.bubbles
      }
    default:
      return state
  }
}

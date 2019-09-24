import axios from 'axios'
import history from '../history'

const GET_ALL_BUBBLES = 'GET_ALL_BUBBLES'
const GET_POPULAR_BUBBLES = 'GET_POPULAR_BUBBLES'
const GET_SINGLE_BUBBLE = 'GET_SINGLE_BUBBLE'

const getAllBubbles = bubbles => ({
  type: GET_ALL_BUBBLES,
  bubbles
})
const getPopularBubbles = bubbles => ({
  type: GET_POPULAR_BUBBLES,
  bubbles
})

const getSingleBubble = bubble => ({
  type: GET_SINGLE_BUBBLE,
  bubble
})

const initialState = {
  bubble: {},
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

export const displaySingleBubble = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/bubbles/${id}`)
    dispatch(getSingleBubble(data))
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
    case GET_SINGLE_BUBBLE:
      return {
        ...state,
        bubble: bubble
      }
    default:
      return state
  }
}

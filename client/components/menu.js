import React, {Component} from 'react'
import {runInNewContext} from 'vm'
import axios from 'axios'
import SingleBubble from './singleBubble'

class Menu extends Component {
  constructor() {
    super()
    this.state = {
      bubbles: {},
      loading: true
    }
  }
  async componentDidMount() {
    try {
      const {data} = await axios.get('/api/bubbles')
      this.setState({bubbles: data, loading: false})
      return <div>this is a test</div>
    } catch (error) {
      next(next)
    }
  }
  renderMenu() {
    if (this.state.loading) {
      return <div> This is loading</div>
    } else {
      const bubbles = this.state.bubbles
      return (
        <div className="all_bubble_styling">
          {bubbles.map((bubble, ind) => {
            return <SingleBubble key={ind} bubbleInfo={bubble} />
          })}
        </div>
      )
    }
  }
  render() {
    console.log(this.state.bubbles)
    const bubbles = this.state.bubbles
    return (
      // <div>
      //   {this.renderMenu()}
      // </div>

      <div>{this.renderMenu()}</div>
    )
  }
}
export default Menu

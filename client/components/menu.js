import React, {Component} from 'react'
import {runInNewContext} from 'vm'
import axios from 'axios'
import {connect} from 'react-redux'
import SingleBubble from './singleBubble'
import {displayAllBubbles} from '../store'

class Menu extends Component {
  async componentDidMount() {
    await this.props.displayAllBubbles()
  }

  renderMenu() {
    if (this.props.bubbles) {
      return this.props.bubbles.map((bubble, ind) => (
        <SingleBubble key={ind} bubbleInfo={bubble} />
      ))
    } else {
      return <h1>loading</h1>
    }
  }
  render() {
    //const bubbles = this.state.bubbles
    return <div className="all_bubble_styling">{this.renderMenu()}</div>
  }
}

//export default Menu

const mapStateToProps = state => {
  return {
    bubbles: state.bubble.bubbles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayAllBubbles: () => dispatch(displayAllBubbles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

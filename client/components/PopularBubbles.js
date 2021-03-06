// NL: Component to display only the popular bubbles

import React from 'react'
import {connect} from 'react-redux'
import {displayPopularBubbles} from '../store'

class PopularBubbles extends React.Component {
  async componentDidMount() {
    await this.props.displayPopularBubbles()
  }
  renderPopular() {
    if (this.props.bubbles) {
      return this.props.bubbles.map(bubble => (
        <img key={bubble.id} className="popular" src={bubble.picture} />
      ))
    } else {
      return <h3>Loading....</h3>
    }
  }

  render() {
    return (
      <div>
        <h4>These are our most popular bubbles !</h4>
        <div>{this.renderPopular()}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bubbles: state.bubble.popularBubbles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayPopularBubbles: () => dispatch(displayPopularBubbles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularBubbles)

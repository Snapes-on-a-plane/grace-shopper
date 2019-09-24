import React, {Component} from 'react'
import {connect} from 'react-redux'
import {displaySingleBubble} from '../store'
import axios from 'axios'

class SingleBubbleteaDisplay extends Component {
  async componentDidMount() {
    const {data} = await axios.get(`/api/bubbles/${id}`)
    console.log(this.props, data)
  }
  renderSingle() {
    if (this.props) {
      // return this.props.bubbles.map(bubble => (
      //   <img key={bubble.id} className="popular" src={bubble.picture} />
      console.log(this.props.bubble)
      return <h2>a single bubble</h2>
      // ))
    } else {
      return <h3>Loading....</h3>
    }
  }

  render() {
    return (
      <div>
        <h4>Bubbletea single</h4>
        <div>{this.renderSingle()}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bubble: state.bubble.bubble
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displaySingleBubble: () => dispatch(displaySingleBubble())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleBubbleteaDisplay
)

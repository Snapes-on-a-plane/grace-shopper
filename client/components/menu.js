import React, {Component} from 'react'
import {runInNewContext} from 'vm'
import axios from 'axios'
import {connect} from 'react-redux'
import SingleBubble from './singleBubble'
import {displayAllBubbles} from '../store/bubble'

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
      // this.props.displayAllBubbles()
      const {data} = await axios.get('/api/bubbles')
      this.setState({bubbles: data, loading: false})
      //return <div>this is a test</div>
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

  // renderMenu() {
  //   console.log(this.props)
  //   if(this.props.bubbles){
  //     return (
  //       <div>bubbles</div>
  //     )
  //   }
  //   else{
  //     return <h1>loading</h1>
  //   }
  // }
  render() {
    //const bubbles = this.state.bubbles
    return (
      <div>{this.renderMenu()}</div>
      // <div>
      // {bubbles.map((campus) => (
      //  <div>bubble</div>
      // ))}
      // </div>
    )
  }
}

export default Menu

// const mapStateToProps = (state) => {
//   return {
//     bubbles: state.bubbles
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     displayAllBubbles: () => dispatch(displayAllBubbles())
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Menu);

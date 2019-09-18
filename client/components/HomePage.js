// Component to display Home page

import React from 'react'
import PopularBubbles from './PopularBubbles'
import {Login, Signup} from './auth-form'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bubbles: props.bubbles
    }
  }
  render() {
    return (
      <div>
        <h1>Who wants Bubbles ?</h1>
        <h2>
          Lots and lots of Bubbles available..... Which one is your favorite ?
        </h2>
        <div id="popular">
          {/*<p>
            <PopularBubbles bubbles={this.state.bubbles} />
          </p>*/}
        </div>
        <hr />
        <div id="login">
          <h4>Login to your account to order your favorite bubble</h4>
          <Login />
        </div>
        <div id="signup">
          <h4>
            Or please signup if you do not have an account with us, so that you
            can keep ordering your favorite bubbles....
          </h4>
          <Signup />
        </div>
      </div>
    )
  }
}

export default HomePage

// Component to display Home page

import React from 'react'
import PopularBubbles from './PopularBubbles'
import {Login, Signup} from './auth-form'

const HomePage = () => {
  return (
    <div>
      <h1>Who wants Bubble Teas ?</h1>
      <h2>
        Lots and lots of Bubble Teas available..... Which one is your favorite ?
      </h2>
      <div id="popular">
        <p>
          <PopularBubbles />
        </p>
      </div>
      <hr />
      <div id="orderOptions">
        <div id="login">
          <h4>Login to your account to order your favorite Bubble Tea</h4>
          <Login />
        </div>
        <div id="signup">
          <h4>
            Or please signup if you do not have an account with us, so that you
            can keep ordering your favorite Bubble Teas....
          </h4>
          <Signup />
        </div>
      </div>
    </div>
  )
}

export default HomePage

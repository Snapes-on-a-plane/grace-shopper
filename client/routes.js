import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  HomePage,
  PageNotFound,
  Menu,
  Checkout,
  SingleBubbleteaDisplay
} from './components'
import {me} from './store'

import {Elements, StripeProvider} from 'react-stripe-elements'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* NL: Modifying routes to reflect our website schema */}
        <Route exact path="/" component={HomePage} />
        <Route path="/menu" component={Menu} />
        {/* KL temp for test */}
        <Route path="/bubbletea/:bubbleId" component={SingleBubbleteaDisplay} />
        <StripeProvider apiKey="pk_test_RilChNllCNG1loEuMTohS9w400Bw64boF1">
          <div className="example">
            <Elements>
              <Route path="/checkout" component={Checkout} />
            </Elements>
          </div>
        </StripeProvider>

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our PageNotFound component as a fallback */}
        <Route component={PageNotFound} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

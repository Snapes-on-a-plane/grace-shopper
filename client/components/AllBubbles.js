import React, {Component} from 'react'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

//intial: S.C.  Comment: finished the Frontend part for the bubbles also implemented supposed redux (state, dispatch)
class AllBubble extends Component {
  render() {
    const MapBubbles = this.props.bubbles.map(bubble => {
      return (
        <div key={bubble.id}>
          <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={bubble.img} />
            <Card.Body>
              <Card.Title>{bubble.name}</Card.Title>
              <Card.Text>
                Address: {bubble.address}
                <br />
                Price : {bubble.price}
                <br />
                Open Hour: {bubble.openHr}
                <br />
                Rating: {bubble.rating}
                <br />
              </Card.Text>
              <Button variant="primary">
                <Link to={`/bubbles/${bubble.id}`}>Order Me</Link>
              </Button>
            </Card.Body>
          </Card>
        </div>
      )
    })
    return (
      <div>
        <h2>Bubbles:</h2>
        <div className="bubbles">{MapBubbles}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bubbles: state.bubbles
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBubble)

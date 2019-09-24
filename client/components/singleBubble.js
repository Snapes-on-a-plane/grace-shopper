import React from 'react'
import ReactDOM from 'react-dom'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {gotOrderItem, gotQty} from '../store/order'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {SingleBubbleteaDisplay} from './singleBubbleteaDisplay'

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})
let qty

const SingleBubble = props => {
  const bubble = props.bubbleInfo
  const classes = useStyles()

  const SendData = data => {
    props.deliverItem(data)
    props.deliverQty(qty)
    props.update(data, qty)
    qty = null
  }

  const Qty = e => {
    qty = e.target.value
  }
  const centsToDollars = cents => {
    const dollars = (cents / 100).toFixed(2)
    return dollars
  }
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={bubble.picture}
          title={bubble.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {bubble.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <i>Rating:</i> {bubble.rating}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bubble.description}
          </Typography>
          <Typography
            style={{marginTop: '15px'}}
            variant="body1"
            color="textSecondary"
            component="p"
          >
            Tea Price: ${centsToDollars(bubble.price)}
          </Typography>
          <Typography
            style={{marginTop: '4px'}}
            variant="body1"
            color="textSecondary"
            component="p"
          >
            Total Ratings:{bubble.user_ratings_total}
          </Typography>
          <Typography
            style={{marginTop: '8px'}}
            variant="body1"
            color="textSecondary"
            component="p"
          >
            Please Select Tea Quantity:{' '}
            <input type="number" onBlur={Qty} className="qtyInput" />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => SendData(bubble)} size="small" color="primary">
          Add to Order
        </Button>
        <Button size="small" color="primary">
          Learn More{' '}
        </Button>
        <Link to={`/bubbletea/${bubble.id}`}> Learn More</Link>
      </CardActions>
    </Card>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deliverItem: data => dispatch(gotOrderItem(data)),
    deliverQty: Qty => dispatch(gotQty(Qty))
  }
}

export default connect(null, mapDispatchToProps)(SingleBubble)

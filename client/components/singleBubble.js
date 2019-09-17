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

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

const SingleBubble = props => {
  console.log(props.bubbleInfo)
  const bubble = props.bubbleInfo
  const classes = useStyles()

  return (
    // <div>
    //    <Button variant="contained" color="primary">
    //   Hello Worlds
    // </Button>
    //   <img src={bubble.picture}></img>
    //   <h3>{bubble.name}</h3>
    //   <p>{bubble.description}</p>
    //   <p>${bubble.price}</p>
    //   <p>{bubble.rating}</p>
    //   <p> total ratings: {bubble.user_ratings_total}</p>
    // </div>
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
            rating:{bubble.rating}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bubble.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${bubble.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            total ratings:{bubble.user_ratings_total}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to Order
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default SingleBubble

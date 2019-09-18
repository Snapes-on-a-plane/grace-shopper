// NL: Component to display only the popular bubbles

import React from 'react'

const PopularBubbles = props => {
  return (
    <div>
      <p>These are our most popular bubbles !</p>
      <ul>
        {props.bubbles.map(bubble => {
          return (
            <li key={bubble.id}>
              {bubble.name}
              <img src={bubble.picture} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PopularBubbles

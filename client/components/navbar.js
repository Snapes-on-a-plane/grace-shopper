import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
    </nav>
    <hr />
  </div>
)

export default Navbar

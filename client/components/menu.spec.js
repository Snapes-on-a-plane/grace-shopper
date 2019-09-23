/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Menu} from './menu'
import {SingleBubble} from './singleBubble'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Menu', () => {
  const bubbleTeas = [
    {name: 'taro', price: 3000},
    {name: 'matcha', price: 4000},
    {name: 'milk tea', price: 5000}
  ]
  let menu
  beforeEach(() => {
    menu = shallow(<Menu bubbles={bubbleTeas} />)
  })
})

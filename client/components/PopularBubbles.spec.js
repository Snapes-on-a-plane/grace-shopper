import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PopularBubbles from './PopularBubbles'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('PopularBubbles', () => {
  const popularTeas = [
    {name: 'taro', rating: 4},
    {name: 'matcha', rating: 3.9},
    {name: 'milk tea', rating: 3.8}
  ]
  let popularBubbles

  beforeEach('Create component', () => {
    popularBubbles = shallow(<PopularBubbles bubbles={popularTeas} />)
  })
})

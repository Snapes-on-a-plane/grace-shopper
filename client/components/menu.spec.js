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
  const bubbleTeas = [{name: 'taro'}, {name: 'matcha'}, {name: 'milk tea'}]
  let menu
  beforeEach(() => {
    menu = shallow(<Menu />)
  })

  it('renders a div', () => {
    expect(menu.find('div'))
  })
})

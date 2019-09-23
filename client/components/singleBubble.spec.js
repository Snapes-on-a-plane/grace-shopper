/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleBubble} from './singleBubble'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleBubble', () => {
  let aTea = {name: 'taro', price: 3500, rating: 4}
  let singleBubble

  beforeEach(() => {
    singleBubble = shallow(<SingleBubble bubble={aTea} />)
  })
})

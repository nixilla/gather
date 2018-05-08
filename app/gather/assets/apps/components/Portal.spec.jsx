/* global describe, it, expect */

import React from 'react'
import { mount } from 'enzyme'

import Portal from './Portal'

class Foo extends React.Component {
  render () {
    return 'foo'
  }
}

describe('Portal', () => {
  it('should render the component in the DOM', () => {
    expect(document.body.getElementsByTagName('div').length).toEqual(0)

    const component = mount(<Portal><Foo /></Portal>)

    expect(document.body.getElementsByTagName('div').length).toEqual(1)
    expect(document.body.getElementsByTagName('div')[0].innerHTML).toEqual('foo')

    component.unmount()

    expect(document.body.getElementsByTagName('div').length).toEqual(0)
  })
})

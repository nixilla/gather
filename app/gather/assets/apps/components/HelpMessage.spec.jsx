/* global describe, it, expect */

import React from 'react'
import { mount } from 'enzyme'

import HelpMessage from './HelpMessage'

class Foo extends React.Component {
  render () {
    return 'foo'
  }
}

describe('HelpMessage', () => {
  it('should render the help message', () => {
    const component = mount(<HelpMessage><Foo /></HelpMessage>)
    expect(component.find('[data-qa="data-help-message"]').exists()).toBeTruthy()
    expect(component.find(Foo).exists()).toBeTruthy()
  })
})

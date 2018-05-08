/* global describe, it, expect */

import React from 'react'
import { IntlProvider } from 'react-intl'
import { mount } from 'enzyme'

import AppIntl from './AppIntl'

class Foo extends React.Component {
  render () {
    return 'foo'
  }
}

describe('AppIntl', () => {
  it('should render the component with wrapped by IntlProvider', () => {
    const component = mount(<AppIntl><Foo /></AppIntl>)

    expect(component.find(IntlProvider).exists()).toBeTruthy()
    expect(component.find(Foo).exists()).toBeTruthy()
    expect(component.text()).toContain('foo')
  })
})

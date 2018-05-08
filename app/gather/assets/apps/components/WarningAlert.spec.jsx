/* global describe, it, expect */

import React from 'react'
import { mount } from 'enzyme'

import WarningAlert from './WarningAlert'

describe('WarningAlert', () => {
  it('should render nothing without the warning list', () => {
    const component = mount(<WarningAlert />)
    expect(component.find('[data-qa="data-warning"]').exists()).toBeFalsy()
  })

  it('should render the warning list', () => {
    const warnings = [
      'warning 1', 'warning 2', 'warning 3'
    ]
    const component = mount(<WarningAlert warnings={warnings} />)
    expect(component.find('[data-qa="data-warning"]').exists()).toBeTruthy()

    expect(component.find('[data-qa="data-warning-0"]').exists()).toBeTruthy()
    expect(component.find('[data-qa="data-warning-0"]').text()).toEqual('warning 1')

    expect(component.find('[data-qa="data-warning-1"]').exists()).toBeTruthy()
    expect(component.find('[data-qa="data-warning-1"]').text()).toEqual('warning 2')

    expect(component.find('[data-qa="data-warning-2"]').exists()).toBeTruthy()
    expect(component.find('[data-qa="data-warning-2"]').text()).toEqual('warning 3')
  })
})

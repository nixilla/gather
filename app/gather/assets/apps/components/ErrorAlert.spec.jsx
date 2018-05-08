/* global describe, it, expect */

import React from 'react'
import { mount } from 'enzyme'

import ErrorAlert from './ErrorAlert'

describe('ErrorAlert', () => {
  it('should render nothing without the error list', () => {
    const component = mount(<ErrorAlert />)
    expect(component.find('[data-qa="data-erred"]').exists()).toBeFalsy()
  })

  it('should render the error list', () => {
    const errors = [
      'error 1', 'error 2', 'error 3'
    ]
    const component = mount(<ErrorAlert errors={errors} />)
    expect(component.find('[data-qa="data-erred"]').exists()).toBeTruthy()

    expect(component.find('[data-qa="data-erred-0"]').exists()).toBeTruthy()
    expect(component.find('[data-qa="data-erred-0"]').text()).toEqual('error 1')

    expect(component.find('[data-qa="data-erred-1"]').exists()).toBeTruthy()
    expect(component.find('[data-qa="data-erred-1"]').text()).toEqual('error 2')

    expect(component.find('[data-qa="data-erred-2"]').exists()).toBeTruthy()
    expect(component.find('[data-qa="data-erred-2"]').text()).toEqual('error 3')
  })
})

/* global describe, it, expect */

import React from 'react'
import { mountWithIntl } from 'enzyme-react-intl'

import FetchErrorAlert from './FetchErrorAlert'

describe('FetchErrorAlert', () => {
  it('should render the fetch error warning', () => {
    const component = mountWithIntl(<FetchErrorAlert />)
    expect(component.find('[data-qa="data-erred"]').exists()).toBeTruthy()
    expect(component.find('[data-qa="data-erred"]').text())
      .toContain('Request was not successful')
  })

  it('should render the fetch error warning with the detailed message', () => {
    const error = {
      content: { detail: 'something went wrong' }
    }
    const component = mountWithIntl(<FetchErrorAlert error={error} />)
    expect(component.find('[data-qa="data-erred"]').exists()).toBeTruthy()
    expect(component.find('[data-qa="data-erred"]').text())
      .toContain('Request was not successful')

    expect(component.find('[data-qa="data-erred-reason"]').exists()).toBeTruthy()
    expect(component.find('[data-qa="data-erred-reason"]').text())
      .toEqual('something went wrong')
  })
})

/* global describe, it, expect */

import React from 'react'
import { mountWithIntl } from 'enzyme-react-intl'
import {
  FormattedDate,
  FormattedRelative,
  FormattedTime
} from 'react-intl'

import FullDateTime from './FullDateTime'

describe('FullDateTime', () => {
  it('should render nothing without a date', () => {
    const component = mountWithIntl(<FullDateTime />)

    expect(component.find(FormattedDate).exists()).toBeFalsy()
    expect(component.find(FormattedTime).exists()).toBeFalsy()
    expect(component.find(FormattedRelative).exists()).toBeFalsy()
  })

  it('should render the full date time', () => {
    const component = mountWithIntl(<FullDateTime date={new Date()} />)

    expect(component.find(FormattedDate).exists()).toBeTruthy()
    expect(component.find(FormattedTime).exists()).toBeTruthy()
    expect(component.find(FormattedRelative).exists()).toBeTruthy()
  })
})

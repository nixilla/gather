import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import { getSurveyorsPath } from '../utils/paths'

export default class SurveyorsList extends Component {
  render () {
    const {list} = this.props

    if (list.length === 0) {
      return <div data-qa='surveyors-list-empty' />
    }

    return (
      <div data-qa='surveyors-list' className='surveyors-list'>
        <h4 className='title'>
          <FormattedMessage
            id='surveyor.list.title'
            defaultMessage='Surveyors' />
        </h4>

        <div className='surveyors'>
          {
            list.map((surveyor) => (
              <div key={surveyor.id} className='surveyor-list-item'>
                <div className='surveyor-header'>
                  <i className='fas fa-user mr-2' />
                  {surveyor.username}
                  <a
                    href={getSurveyorsPath({action: 'edit', id: surveyor.id})}
                    role='button'
                    className='btn btn-sm btn-secondary icon-only float-right'>
                    <i className='fas fa-pencil-alt' />
                  </a>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

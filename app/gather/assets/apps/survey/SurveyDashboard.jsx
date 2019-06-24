import React from 'react'
import { FormattedMessage } from 'react-intl'

const SurveyDashboard = props => (
  !props.consumerState
    ? <div style={{ textAlign: '-webkit-center', padding: '20px' }}>
      <h4>
        <FormattedMessage
          id='survey.no.dashboard.help-1'
          defaultMessage='No Dashboard here?' />
      </h4>
      <FormattedMessage
        id='survey.no.dashboard.help-2'
        defaultMessage='When you activate the dashboard, data will be sent to Elastic Search.' />
      <button
        onClick={() => {}}
        role='button'
        style={{ marginTop: '10px' }}
        className='btn btn-primary btn-icon'>
        <i className='fas fa-pencil-alt invert mr-3' />
        <FormattedMessage
          id='survey.no.dashboard.activate'
          defaultMessage='Activate Dashboard Now' />
      </button>
    </div>
    : <iframe style={{ width: '100%', height: '500px' }} src={props.url} />
)

export default SurveyDashboard

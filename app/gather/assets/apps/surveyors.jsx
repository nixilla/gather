import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

import { AppIntl } from './components'
import SurveyorDispatcher from './surveyor'

/*
This is the surveyors app
*/

const appElement = document.getElementById('surveyors-app')
const surveyorId = appElement.getAttribute('data-surveyor-id')
const action = appElement.getAttribute('data-action')

const dispatcher = (
  <AppIntl>
    <SurveyorDispatcher action={action} surveyorId={surveyorId} />
  </AppIntl>
)

ReactDOM.render(dispatcher, appElement)

// Include this to enable HMR for this module
hot(module)(dispatcher)

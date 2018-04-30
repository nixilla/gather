import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

import { AppIntl } from './components'
import SurveyDispatcher from './survey'

/*
This is the surveys/surveys app.

An Aether "Mapping" is equivalent to a Gather "Survey".
*/

const appElement = document.getElementById('surveys-app')
const surveyId = appElement.getAttribute('data-survey-id')
const action = appElement.getAttribute('data-action')

const dispatcher = (
  <AppIntl>
    <SurveyDispatcher action={action} surveyId={surveyId} />
  </AppIntl>
)

ReactDOM.render(dispatcher, appElement)

// Include this to enable HMR for this module
hot(module)(dispatcher)

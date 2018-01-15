import React from 'react'
import ReactDOM from 'react-dom'

import { AppIntl, FetchUrlsContainer, PaginationContainer } from './components'
import { getResponsesAPIPath, getSurveyorsAPIPath, getSurveysAPIPath } from './utils/paths'
import { ODK_ACTIVE } from './utils/env'
import { ODK_APP } from './utils/constants'

import Survey from './survey/Survey'
import SurveyForm from './survey/SurveyForm'
import SurveysList from './survey/SurveysList'

// Include this to enable HMR for this module
if (module.hot) {
  module.hot.accept()
}

/*
This is the surveys app
*/

const appElement = document.getElementById('surveys-app')
const surveyId = appElement.getAttribute('data-survey-id')
const action = appElement.getAttribute('data-action')

let component
switch (action) {
  case 'add':
    component = <SurveyForm survey={{}} />

    if (ODK_ACTIVE) {
      const addUrls = [
        {
          name: 'surveyors',
          url: getSurveyorsAPIPath({ page: 1, pageSize: 1000 })
        }
      ]
      component = <FetchUrlsContainer urls={addUrls} targetComponent={SurveyForm} />
    }
    break

  case 'edit':
    const editUrls = [
      {
        name: 'survey',
        url: getSurveysAPIPath({id: surveyId})
      }
    ]

    if (ODK_ACTIVE) {
      const odkUrls = [
        {
          name: 'odkSurvey',
          url: getSurveysAPIPath({ app: ODK_APP, id: surveyId }),
          force: {
            url: getSurveysAPIPath({ app: ODK_APP }),
            data: { survey_id: surveyId }
          }
        },
        {
          name: 'surveyors',
          url: getSurveyorsAPIPath({ page: 1, pageSize: 1000 })
        }
      ]

      // add odk urls to edit ones
      odkUrls.forEach(url => editUrls.push(url))
    }

    component = <FetchUrlsContainer urls={editUrls} targetComponent={SurveyForm} />
    break

  case 'view':
    const viewUrls = [
      {
        name: 'survey',
        url: getSurveysAPIPath({id: surveyId, withStats: true})
      },
      {
        // take the first 10 responses to extract the table columns
        name: 'responses',
        url: getResponsesAPIPath({surveyId, pageSize: 10})
      }
    ]

    component = <FetchUrlsContainer urls={viewUrls} targetComponent={Survey} />
    break

  default:
    component = (
      <PaginationContainer
        pageSize={12}
        url={getSurveysAPIPath({withStats: true})}
        position='top'
        listComponent={SurveysList}
        search
        showPrevious
        showNext
      />
    )
    break
}

ReactDOM.render(<AppIntl>{ component }</AppIntl>, appElement)

import React, { Component } from 'react'

import { FetchUrlsContainer, PaginationContainer } from '../components'
import { getSubmissionsAPIPath, getSurveyorsAPIPath, getSurveysAPIPath, getProjectAPIPath } from '../utils/paths'
import { ODK_ACTIVE } from '../utils/env'
import { ODK_APP } from '../utils/constants'

import Survey from './Survey'
import SurveyForm from './SurveyForm'
import SurveysList from './SurveysList'

export default class SurveyDispatcher extends Component {
  render () {
    const {action, surveyId} = this.props

    switch (action) {
      case 'add':
        if (ODK_ACTIVE) {
          const addUrls = [
            {
              name: 'surveyors',
              url: getSurveyorsAPIPath({ page: 1, pageSize: 1000 })
            },
            {
              name: 'project',
              url: getProjectAPIPath()
            }
          ]
          return <FetchUrlsContainer urls={addUrls} targetComponent={SurveyForm} />
        }

        return <SurveyForm survey={{}} />

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
                data: { mapping_id: surveyId }
              }
            },
            {
              name: 'surveyors',
              url: getSurveyorsAPIPath({ page: 1, pageSize: 1000 })
            },
            {
              name: 'project',
              url: getProjectAPIPath()
            }
          ]

          // add odk urls to edit ones
          odkUrls.forEach(url => editUrls.push(url))
        }

        return <FetchUrlsContainer urls={editUrls} targetComponent={SurveyForm} />

      case 'view':
        const viewUrls = [
          {
            name: 'survey',
            url: getSurveysAPIPath({id: surveyId, withStats: true})
          },
          {
            // take the first 10 submissions to extract the table columns
            name: 'submissions',
            url: getSubmissionsAPIPath({mapping: surveyId, pageSize: 10})
          },
          {
            name: 'project',
            url: getProjectAPIPath()
          }
        ]

        return <FetchUrlsContainer urls={viewUrls} targetComponent={Survey} />

      default:
        return (
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
    }
  }
}

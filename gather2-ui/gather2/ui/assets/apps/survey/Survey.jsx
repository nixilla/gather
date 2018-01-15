import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import { FetchUrlsContainer, PaginationContainer } from '../components'
import { range } from '../utils'
import { MAX_PAGE_SIZE, UI_APP } from '../utils/constants'
import { getSurveysPath, getSurveysAPIPath, getResponsesAPIPath } from '../utils/paths'
import { flatten } from '../utils/types'

import SurveyDetail from './SurveyDetail'
import SurveyMasks from './SurveyMasks'
import ResponsesList from '../response/ResponsesList'
import ResponsesItem from '../response/ResponsesItem'

const TABLE_SIZE = 10
const SEPARATOR = '¬¬¬'  // very uncommon string

export default class Survey extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pageSize: TABLE_SIZE,
      total: props.responses.count,
      allColumns: [],
      selectedColumns: []
    }

    const {results} = props.responses
    if (results.length) {
      const allFlattenKeys = []

      // use the initial responses to extract the possible columns
      results.forEach(result => {
        Object.keys(flatten(result.data, SEPARATOR))
              .forEach(key => { allFlattenKeys.push(key) })
      })

      this.state.allColumns = [ ...new Set(allFlattenKeys) ]
      this.state.selectedColumns = [ ...this.state.allColumns ]
    }
  }

  render () {
    const {survey} = this.props

    return (
      <div data-qa={`survey-item-${survey.id}`} className='survey-view'>
        <div className='survey-header'>
          <h2>{survey.name}</h2>
          <a
            href={getSurveysPath({action: 'edit', id: survey.id})}
            role='button'
            className='btn btn-primary btn-icon'>
            <i className='fa fa-pencil invert mr-3' />
            <FormattedMessage
              id='survey.view.action.edit'
              defaultMessage='Edit survey' />
          </a>
        </div>

        <SurveyDetail survey={survey} />

        { this.renderResponses() }
      </div>
    )
  }

  renderResponses () {
    const {survey} = this.props

    if (survey.responses === 0) {
      return ''
    }

    const {pageSize} = this.state
    const ResponseComponent = (pageSize === 1 ? ResponsesItem : ResponsesList)
    const extras = {
      separator: SEPARATOR,
      columns: this.state.selectedColumns
    }

    return (
      <div className='survey-data'>
        <div className='survey-data-toolbar'>
          <ul className='survey-data-tabs'>
            <li>
              <button
                className={`tab ${pageSize !== 1 ? 'active' : ''}`}
                onClick={() => { this.setState({ pageSize: TABLE_SIZE }) }}
                >
                <i className='fa fa-th-list mr-2' />
                <FormattedMessage
                  id='survey.view.action.table'
                  defaultMessage='Table' />
              </button>
            </li>
            <li>
              <button
                className={`tab ${pageSize === 1 ? 'active' : ''}`}
                onClick={() => { this.setState({ pageSize: 1 }) }}
                >
                <i className='fa fa-file mr-2' />
                <FormattedMessage
                  id='survey.view.action.single'
                  defaultMessage='Single' />
              </button>
            </li>
            <li>
              { this.renderDownloadButton() }
            </li>
            <li className='toolbar-filter'>
              { this.renderMaskButton() }
            </li>
          </ul>
        </div>
        <PaginationContainer
          pageSize={pageSize}
          url={getResponsesAPIPath({surveyId: survey.id})}
          position='top'
          listComponent={ResponseComponent}
          search
          showPrevious
          showNext
          extras={extras}
        />
      </div>
    )
  }

  renderDownloadButton () {
    const {survey} = this.props
    const {total, allColumns, selectedColumns} = this.state

    const pageSize = MAX_PAGE_SIZE
    const params = {
      surveyId: survey.id,
      fields: 'created,data',
      format: 'csv',
      pageSize
    }

    // restrict the columns to export with the selected columns
    if (selectedColumns.length !== allColumns.length) {
      params.columns = 'created,' + selectedColumns
        .map(key => 'data.' + key.replace(new RegExp(SEPARATOR, 'g'), '.'))
        .join(',')
    }

    if (total < pageSize) {
      return (
        <a
          className='tab'
          href={getResponsesAPIPath(params)}
          download={`${survey.name}.csv`}
          >
          <i className='fa fa-download mr-2' />
          <FormattedMessage
            id='survey.view.action.download'
            defaultMessage='Download' />
        </a>
      )
    }

    const pages = range(1, Math.ceil(total / pageSize) + 1)
    const dropdown = 'downloadLinkChoices'

    return (
      <div className='dropdown'>
        <button
          className='tab'
          id={dropdown}
          data-toggle='dropdown'
          >
          <i className='fa fa-download mr-2' />
          <FormattedMessage
            id='survey.view.action.download'
            defaultMessage='Download' />
        </button>

        <div
          className='dropdown-menu'
          aria-labelledby={dropdown}
          >
          <div className='dropdown-list'>
            {
              pages.map(page => (
                <a
                  key={page}
                  className='dropdown-item'
                  href={getResponsesAPIPath({...params, page})}
                  download={`${survey.name}-${page}.csv`}>
                  {`${survey.name}-${page}.csv`}
                </a>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

  renderMaskButton () {
    if (this.state.allColumns.length === 0) {
      return ''
    }

    const handleResponse = (response) => ({
      ...response,
      columns: this.state.allColumns,
      separator: SEPARATOR,
      onChange: (selectedColumns) => { this.setState({ selectedColumns }) }
    })

    const urls = [
      {
        name: 'survey',
        url: getSurveysAPIPath({ app: UI_APP, id: this.props.survey.id }),
        force: {
          url: getSurveysAPIPath({ app: UI_APP }),
          data: { survey_id: this.props.survey.id, name: this.props.survey.name }
        }
      }
    ]

    return <FetchUrlsContainer
      urls={urls}
      handleResponse={handleResponse}
      targetComponent={SurveyMasks}
    />
  }
}

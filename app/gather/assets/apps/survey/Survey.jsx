/*
 * Copyright (C) 2019 by eHealth Africa : http://www.eHealthAfrica.org
 *
 * See the NOTICE file distributed with this work for additional information
 * regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react'
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl'

import { FetchUrlsContainer, PaginationContainer } from '../components'
import { GATHER_APP } from '../utils/constants'
import {
  getSurveysPath,
  getSurveysAPIPath,
  getEntitiesAPIPath,
  getMappingTopicsAPIPath
} from '../utils/paths'
import { fetchUrls } from '../utils/request'
import { cleanJsonPaths, reorderObjectKeys } from '../utils/types'

import SurveyDetail from './SurveyDetail'
import SurveyDashboard from './SurveyDashboard'
import SurveyMasks from './mask/SurveyMasks'
import EntitiesList from './entity/EntitiesList'
import EntityItem from './entity/EntityItem'
import EntitiesDownload from './entity/EntitiesDownload'

const TABLE_VIEW = 'table'
const SINGLE_VIEW = 'single'
const DASHBOARD_VIEW = 'dashboard'
const TABLE_SIZES = [ 10, 25, 50, 100 ]

const MESSAGES = defineMessages({
  activate: {
    id: 'survey.button.activate',
    defaultMessage: 'Activate Survey'
  },
  deactivate: {
    id: 'survey.button.deactivate',
    defaultMessage: 'Deactivate Survey'
  }
})

class Survey extends Component {
  constructor (props) {
    super(props)

    const paths = cleanJsonPaths(props.skeleton.jsonpaths)
    this.state = {
      viewMode: TABLE_VIEW,
      total: props.survey.entities_count,
      labels: props.skeleton.docs,
      allPaths: paths,
      selectedPaths: paths,
      isConsumerActive: false,
      activationError: null
    }
    this.toggleConsumer = this.toggleConsumer.bind(this)
  }

  toggleConsumer () {
    const xform = this.props.xform && this.props.xform.results.length && this.props.xform.results[0]
    const url = getMappingTopicsAPIPath({ id: xform ? xform.kernel_id : '' })

    // get list of survey topics from kernel
    fetchUrls([{ name: 'topics', url }])
      .then(() => {
        // TODO: Check consumer state
        // if off, register topics and start consumer job
        // if on, unregister topics and stop consumer job
        this.setState({
          isConsumerActive: !this.state.isConsumerActive,
          activationError: null
        })
      })
      .catch(error => {
        this.setState({
          activationError: error
        })
      })
  }

  render () {
    const { survey } = this.props
    const { formatMessage } = this.props.intl

    return (
      <div data-qa={`survey-item-${survey.id}`} className='survey-view'>
        <div className='survey-header'>
          <h2>{survey.name}</h2>
          <div className='header-actions'>
            <button
              onClick={this.toggleConsumer}
              role='button'
              style={{ marginRight: '15px' }}
              className='btn btn-secondary btn-icon'>
              <i className={`fas mr-3 ${this.state.isConsumerActive ? 'fa-pause-circle' : 'fa-play-circle'}`}/>
              { formatMessage(MESSAGES[this.state.isConsumerActive ? 'deactivate' : 'activate']) }
            </button>
            <a
              href={getSurveysPath({ action: 'edit', id: survey.id })}
              role='button'
              className='btn btn-primary btn-icon'>
              <i className='fas fa-pen invert mr-3' />
              <FormattedMessage
                id='survey.view.action.edit'
                defaultMessage='Edit survey' />
            </a>
          </div>
        </div>

        <SurveyDetail survey={survey} />

        {this.renderEntities()}
      </div>
    )
  }

  renderEntities () {
    if (this.state.total === 0) {
      return ''
    }

    const { skeleton, survey } = this.props
    const { viewMode } = this.state
    const listComponent = (viewMode === SINGLE_VIEW ? EntityItem : EntitiesList)
    const extras = {
      labels: this.state.labels,
      paths: this.state.selectedPaths
    }
    const filename = skeleton.name || survey.name

    // Postgres uses JSONB type to store the payload value and
    // this breaks the keys order that we need to maintain to display each Entity.
    // Hence, we are trying to rebuild each payload with the correct keys order.
    const mapResponse = (list) => list.map(
      entity => ({
        ...entity,
        payload: reorderObjectKeys(entity.payload, skeleton.jsonpaths)
      })
    )

    return (
      <div className='survey-data'>
        <div className='survey-data-toolbar'>
          <ul className='survey-data-tabs'>
            <li className='dashboard-tab'>
              <button
                type='button'
                disabled={viewMode === DASHBOARD_VIEW}
                className={`tab ${viewMode === DASHBOARD_VIEW ? 'active' : ''}`}
                onClick={() => { this.setState({ viewMode: DASHBOARD_VIEW }) }}
              >
                <i className='fas fa-chart-area mr-2' />
                <FormattedMessage
                  id='survey.view.action.dashboard'
                  defaultMessage='Dashboard' />
              </button>
            </li>
            <li>
              <button
                type='button'
                disabled={viewMode === TABLE_VIEW}
                className={`tab ${viewMode === TABLE_VIEW ? 'active' : ''}`}
                onClick={() => { this.setState({ viewMode: TABLE_VIEW }) }}
              >
                <i className='fas fa-th-list mr-2' />
                <FormattedMessage
                  id='survey.view.action.table'
                  defaultMessage='Table'
                />
              </button>
            </li>
            <li>
              <button
                type='button'
                disabled={viewMode === SINGLE_VIEW}
                className={`tab ${viewMode === SINGLE_VIEW ? 'active' : ''}`}
                onClick={() => { this.setState({ viewMode: SINGLE_VIEW }) }}
              >
                <i className='fas fa-file mr-2' />
                <FormattedMessage
                  id='survey.view.action.single'
                  defaultMessage='Single'
                />
              </button>
            </li>
            <li>
              <EntitiesDownload
                survey={this.props.survey}
                total={this.state.total}
                paths={this.state.selectedPaths}
                labels={this.state.labels}
                settings={this.props.settings}
                filename={filename}
              />
            </li>
            {
              this.state.viewMode != DASHBOARD_VIEW &&
                <li className='toolbar-filter'>
                  { this.renderMaskButton() }
                </li>
            }

          </ul>
        </div>
        {
          this.state.viewMode === DASHBOARD_VIEW
            ? <SurveyDashboard
              survey={survey}
              consumerState={this.state.isConsumerActive}
              url={this.props.settings.ES_CONSUMER_URL}
            />
            : <PaginationContainer
              pageSize={viewMode === SINGLE_VIEW ? 1 : TABLE_SIZES[0]}
              sizes={viewMode === SINGLE_VIEW ? [] : TABLE_SIZES}
              url={getEntitiesAPIPath({ project: survey.id })}
              position='top'
              listComponent={listComponent}
              showPrevious
              showNext
              extras={extras}
              mapResponse={mapResponse}
            />
        }
      </div>
    )
  }

  renderMaskButton () {
    if (this.state.allPaths.length === 0) {
      return ''
    }

    const handleResponse = (response) => ({
      ...response,
      columns: this.state.allPaths,
      initialSelected: this.state.selectedPaths,
      labels: this.state.labels,
      onChange: (selectedPaths) => { this.setState({ selectedPaths }) }
    })

    const urls = [
      {
        name: 'survey',
        url: getSurveysAPIPath({ app: GATHER_APP, id: this.props.survey.id }),
        force: {
          url: getSurveysAPIPath({ app: GATHER_APP }),
          data: { project_id: this.props.survey.id, name: this.props.survey.name }
        }
      }
    ]

    return (
      <FetchUrlsContainer
        urls={urls}
        handleResponse={handleResponse}
        targetComponent={SurveyMasks}
      />
    )
  }
}

export default injectIntl(Survey)

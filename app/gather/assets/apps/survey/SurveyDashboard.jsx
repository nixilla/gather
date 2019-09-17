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

import React from 'react'
import { FormattedMessage } from 'react-intl'

const renderIframe = props => (
  <div className='survey-content dashboard'>
    <iframe src={props.url} />
  </div>
)

const handleToggle = props => {
  props.toggle()
}

const renderEmpty = props => (
  <div className='survey-content no-dashboard'>
    <h4 className='headline'>
      <FormattedMessage
        id='survey.no.dashboard.help-1'
        defaultMessage='No Dashboard here?'
      />
    </h4>
    <FormattedMessage
      id='survey.no.dashboard.help-2'
      defaultMessage='When you activate the dashboard, data will be sent to Elastic Search.'
    />
    <button
      onClick={handleToggle.bind(this, props)}
      role='button'
      className='btn btn-secondary btn-lg mt-4'
    >
      <FormattedMessage
        id='survey.no.dashboard.activate'
        defaultMessage='Activate Dashboard Now'
      />
    </button>
  </div>
)

const SurveyDashboard = props => (
  !props.consumerState ? renderEmpty(props) : renderIframe(props)
)

export default SurveyDashboard

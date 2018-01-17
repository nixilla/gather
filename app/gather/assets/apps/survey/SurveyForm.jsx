import React, { Component } from 'react'
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl'

import { clone, deepEqual } from '../utils'
import { deleteData, postData, putData, patchData } from '../utils/request'
import { getSurveysAPIPath, getSurveysPath } from '../utils/paths'
import { ODK_ACTIVE } from '../utils/env'
import { ODK_APP } from '../utils/constants'

import { ConfirmButton, ErrorAlert, HelpMessage } from '../components'
import SurveyODKForm from './SurveyODKForm'

const MESSAGES = defineMessages({
  definitionError: {
    defaultMessage: 'This is not a valid JSON definition.',
    id: 'survey.form.definition.error'
  },

  cancelButton: {
    defaultMessage: 'Cancel',
    id: 'survey.form.action.cancel'
  },
  cancelConfirm: {
    defaultMessage: 'Are you sure you want to cancel your changes?',
    id: 'survey.form.action.cancel.confirm'
  },

  deleteButton: {
    defaultMessage: 'Delete survey',
    id: 'survey.form.action.delete'
  },
  deleteConfirm: {
    defaultMessage: 'Are you sure you want to delete the survey “{name}”?',
    id: 'survey.form.action.delete.confirm'
  },
  deleteError: {
    defaultMessage: 'An error occurred while deleting the survey “{name}”',
    id: 'survey.form.action.delete.error'
  },
  submitError: {
    defaultMessage: 'An error occurred while saving the survey “{name}”',
    id: 'survey.form.action.submit.error'
  }
})

export class SurveyForm extends Component {
  constructor (props) {
    super(props)
    const survey = clone(this.props.survey || {})
    this.state = {
      ...survey,
      definitionStringified: JSON.stringify(survey.definition || {}, 0, 2),
      errors: {},
      isUpdating: false
    }

    if (ODK_ACTIVE) {
      this.state.odk = {...clone(props.odkSurvey || {})}
    }
  }

  render () {
    const survey = this.state
    const {errors, isUpdating} = survey
    const dataQA = (
      (survey.id === undefined)
      ? 'survey-add'
      : `survey-edit-${survey.id}`
    )

    return (
      <div data-qa={dataQA} className='survey-edit'>
        <h3 className='page-title'>{ this.renderTitle() }</h3>

        <ErrorAlert errors={errors.generic} />
        { isUpdating && this.renderUpdating() }

        <form onSubmit={this.onSubmit.bind(this)} encType='multipart/form-data'>
          { this.renderName() }
          { this.renderRevision() }
          { this.renderDefinition() }
          {
            ODK_ACTIVE &&
            <SurveyODKForm
              survey={this.state.odk}
              surveyors={this.props.surveyors}
              onChange={(odk) => this.setState({ odk })}
              errors={errors.odk}
            />
          }
          { this.renderButtons() }
        </form>
      </div>
    )
  }

  renderTitle () {
    const survey = this.state
    if (survey.id === undefined) {
      return (
        <FormattedMessage
          id='survey.form.title.add'
          defaultMessage='New survey' />
      )
    } else {
      return (
        <span>
          <FormattedMessage
            id='survey.form.title.edit'
            defaultMessage='Edit survey' />
          <span className='survey-name ml-1'>{survey.name}</span>
        </span>
      )
    }
  }

  renderName () {
    const survey = this.state
    const {errors} = survey

    return (
      <div className={`form-group big-input ${errors.name ? 'error' : ''}`}>
        <label className='form-control-label title'>
          <FormattedMessage
            id='survey.form.name'
            defaultMessage='Name' />
        </label>
        <input
          name='name'
          type='text'
          className='form-control'
          required
          value={survey.name || ''}
          onChange={this.onInputChange.bind(this)}
        />
        <ErrorAlert errors={errors.name} />
      </div>
    )
  }

  renderRevision () {
    const survey = this.state
    const {errors} = survey

    return (
      <div className={`form-group big-input ${errors.revision ? 'error' : ''}`}>
        <label className='form-control-label title'>
          <FormattedMessage
            id='survey.form.revision'
            defaultMessage='Revision' />
        </label>
        <input
          name='revision'
          type='text'
          className='form-control'
          required
          value={survey.revision || ''}
          onChange={this.onInputChange.bind(this)}
        />
        <ErrorAlert errors={errors.revision} />
      </div>
    )
  }

  renderDefinition () {
    const survey = this.state
    const {errors} = survey

    return (
      <div>
        <div className={`form-group ${errors.definition_file ? 'error' : ''}`}>
          <label className='form-control-label title'>
            <FormattedMessage
              id='survey.form.definition'
              defaultMessage='Definition (JSON format)' />
          </label>
          <HelpMessage>
            <FormattedMessage
              id='survey.form.definition.help'
              defaultMessage='You can upload a file using the button below or type or paste the definition in the textarea.' />
          </HelpMessage>
          <div>
            <label className='btn btn-secondary' htmlFor='definitionFile'>
              <FormattedMessage
                id='survey.form.definition.file'
                defaultMessage='Upload definition file' />
            </label>
            <input
              name='definitionFile'
              id='definitionFile'
              type='file'
              className='hidden-file'
              accept='.json'
              onChange={this.onFileChange.bind(this)}
            />
            {
              survey.definitionFile &&
              <span className='form-item ml-4'>
                <i className='fa fa-file mr-2' />
                <span>{ survey.definitionFile.name }</span>
                <button
                  className='btn btn-sm icon-only btn-danger ml-2'
                  onClick={this.removeFile.bind(this)}><i className='fa fa-close' /></button>
              </span>
            }
            <ErrorAlert errors={errors.definition_file} />
          </div>
        </div>

        <div className={`form-group ${errors.definition ? 'error' : ''}`}>
          <textarea
            name='definitionStringified'
            className='form-control code'
            disabled={survey.definitionFile !== undefined}
            rows={10}
            value={survey.definitionStringified}
            onChange={this.onInputChange.bind(this)}
          />
          <ErrorAlert errors={errors.definition} />
        </div>
      </div>
    )
  }

  renderButtons () {
    const {formatMessage} = this.props.intl

    return (
      <div className='actions'>
        { (this.props.survey && this.props.survey.id) &&
          <div>
            <ConfirmButton
              className='btn btn-delete'
              cancelable
              onConfirm={this.onDelete.bind(this)}
              title={this.renderTitle()}
              message={formatMessage(MESSAGES.deleteConfirm, {...this.props.survey})}
              buttonLabel={formatMessage(MESSAGES.deleteButton)}
            />
          </div>
        }
        <div>
          <ConfirmButton
            className='btn btn-cancel btn-block'
            cancelable
            condition={this.onCancelCondition.bind(this)}
            onConfirm={this.onCancel.bind(this)}
            title={this.renderTitle()}
            message={formatMessage(MESSAGES.cancelConfirm)}
            buttonLabel={formatMessage(MESSAGES.cancelButton)}
          />
        </div>
        <div>
          <button type='submit' className='btn btn-primary btn-block'>
            <FormattedMessage
              id='survey.form.action.submit'
              defaultMessage='Save survey' />
          </button>
        </div>
      </div>
    )
  }

  renderUpdating () {
    return (
      <div className='modal show'>
        <div className='modal-dialog modal-md'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{this.renderTitle()}</h5>
            </div>

            <div className='modal-body'>
              <i className='fa fa-spin fa-cog mr-2' />
              <FormattedMessage
                id='survey.form.action.updating'
                defaultMessage='Saving data in progress…' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  onInputChange (event) {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  onFileChange (event) {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.files.item(0) })
  }

  removeFile (event) {
    event.preventDefault()
    this.setState({ definitionFile: undefined })
  }

  onCancelCondition () {
    // check if there were changes
    if (this.state.definitionFile !== undefined) {
      return true
    }

    const initialSurvey = clone(this.props.survey || { name: '', revision: '', definition: {} })

    try {
      const survey = {
        ...initialSurvey,
        name: this.state.name,
        revision: this.state.revision,
        definition: JSON.parse(this.state.definitionStringified)
      }

      return !deepEqual(initialSurvey, survey, true)
    } catch (e) {
      // let's suppose that the `definitionStringified` is wrong because it was modified
      return true
    }
  }

  onCancel () {
    if (this.props.survey) {
      // navigate to Survey view page
      window.location.pathname = getSurveysPath({action: 'view', id: this.props.survey.id})
    } else {
      // navigate to Surveys list page
      window.location.pathname = getSurveysPath({action: 'list'})
    }
  }

  onSubmit (event) {
    event.preventDefault()
    this.setState({ errors: {} })

    const {formatMessage} = this.props.intl
    const survey = {
      id: this.state.id,
      name: this.state.name
    }

    // check if the definition comes from a file or from the textarea
    const {definitionFile, definitionStringified} = this.state
    let multipart = false
    if (definitionFile) {
      multipart = true
      survey.definition = '{}'
      survey.definition_file = definitionFile
    } else {
      try {
        survey.definition = JSON.parse(definitionStringified)
      } catch (e) {
        this.setState({
          errors: {
            definition: [formatMessage(MESSAGES.definitionError)]
          }
        })
        return
      }
    }

    const saveMethod = (survey.id ? putData : postData)
    const url = getSurveysAPIPath({id: survey.id})

    this.setState({ isUpdating: true })
    return saveMethod(url, survey, multipart)
      .then(response => {
        if (ODK_ACTIVE) {
          this.setState({ id: response.id }) // update state with new id
          return this.onSubmitODK(response)
        } else {
          this.backToView(response)
        }
      })
      .catch(this.handleError.bind(this))
  }

  onDelete () {
    const {survey} = this.props
    const handleError = (error) => { this.handleError(error, 'delete') }

    this.setState({ isUpdating: true })
    return deleteData(getSurveysAPIPath({id: survey.id}))
      .then(() => {
        if (ODK_ACTIVE) {
          // remove it also in ODK
          return this.onDeleteODK()
        } else {
          this.backToList()
        }
      })
      .catch(handleError)
  }

  onSubmitODK (kernelSurvey) {
    const survey = this.state.odk

    // save changes in ODK
    const saveMethod = (survey.mapping_id ? putData : postData)
    const saveUrl = getSurveysAPIPath({app: ODK_APP, id: survey.mapping_id})

    const odkSurvey = {
      mapping_id: kernelSurvey.id,
      name: kernelSurvey.name,
      surveyors: this.state.odk.surveyors
    }

    return saveMethod(saveUrl, odkSurvey)
      .then(this.onSubmitODKXForms.bind(this))
      .catch(this.handleODKError.bind(this))
  }

  onSubmitODKXForms (odkSurvey) {
    this.setState({ odk: { ...this.state.odk, id: odkSurvey.mapping_id } }) // update state with new id
    const patchUrl = getSurveysAPIPath({app: ODK_APP, id: odkSurvey.mapping_id})

    // update ALL the existing xForms and create the new ones without FILE.
    const xforms = this.state.odk.xforms || []

    const xFormsWithoutFiles = xforms
      .filter(xform => (!xform.file || xform.id))
      .map(xform => ({
        ...xform,
        // remove new media files (does not have `id`)
        media_files: (xform.media_files || [])
          .filter(mediaFile => mediaFile.id)
          .map(mediaFile => mediaFile.id),
        // remove possible new file
        file: undefined
      }))

    // update ALL the xForms or Media Files (existing and new ones) with FILE.
    // expected format:
    // {
    //    files: number of files (n+1)
    //    id_0: xform id (update) or 0 (new)
    //    file_0: linked file
    //    type_0: xform|media
    //    ...
    //    id_n: xform id (update) or 0 (new)
    //    file_n: linked file
    //    type_n: xform|media
    // }
    const filesPayload = {
      files: 0
    }
    xforms.forEach(xform => {
      // include xform file
      if (xform.file) {
        const index = filesPayload.files
        filesPayload[`id_${index}`] = xform.id || 0
        filesPayload[`file_${index}`] = xform.file
        filesPayload[`type_${index}`] = 'xform'
        filesPayload.files = index + 1
      }

      // include media files
      (xform.media_files || [])
        .filter(mediaFile => mediaFile.file)
        .forEach(mediaFile => {
          const jndex = filesPayload.files
          filesPayload[`id_${jndex}`] = xform.id
          filesPayload[`file_${jndex}`] = mediaFile.file
          filesPayload[`type_${jndex}`] = 'media'
          filesPayload.files = jndex + 1
        })
    })
    console.log(xFormsWithoutFiles)
    // save xForms without files info
    return patchData(patchUrl, { xforms: xFormsWithoutFiles })
      .then(() => {
        console.log(filesPayload)
        if (filesPayload.files === 0) {
          // nothing more to do, skip last call
          this.backToView(odkSurvey)
          return
        }
        // save xForms/Media files with files
        return patchData(patchUrl, filesPayload, true)
          .then(() => this.backToView(odkSurvey))
          .catch(this.handleODKError.bind(this))
      })
      .catch(this.handleODKError.bind(this))
  }

  onDeleteODK () {
    return deleteData(getSurveysAPIPath({app: ODK_APP, id: this.props.survey.id}))
      .then(this.backToList)
      .catch(this.backToList) // ignore ODK errors???
  }

  handleODKError (error) {
    return this.handleError(error, 'submit', 'odk')
  }

  handleError (error, action, nestedProperty) {
    /**
     * Handles the given error during the execution of the specific action.
     * The error response object is assigned to `errors` or to some of its
     * nested objects (defined by `nestedProperty`)
     */
    const {formatMessage} = this.props.intl

    console.log(error.message)
    this.setState({ isUpdating: false })

    return error.response
      .then(errors => {
        if (nestedProperty) {
          this.setState({ errors: { [nestedProperty]: errors } })
        } else {
          this.setState({ errors })
        }
      })
      .catch((err) => {
        console.log(err.message)

        const actionMessage = (action === 'delete')
          ? MESSAGES.deleteError
          : MESSAGES.submitError
        const generic = [formatMessage(actionMessage, {...this.state})]

        if (nestedProperty) {
          this.setState({ errors: { [nestedProperty]: { generic } } })
        } else {
          this.setState({ errors: { generic } })
        }
      })
  }

  backToView (survey) {
    // navigate to Survey view page
    window.location.pathname = getSurveysPath({action: 'view', id: (survey.id || survey.mapping_id)})
  }

  backToList () {
    // navigate to Surveys list page
    window.location.pathname = getSurveysPath({action: 'list'})
  }
}

// Include this to enable `this.props.intl` for this component.
export default injectIntl(SurveyForm)

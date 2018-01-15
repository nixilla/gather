/* global describe, it */

import assert from 'assert'
import {
  buildQueryString,
  getResponsesAPIPath,
  getSurveyorsAPIPath,
  getSurveyorsPath,
  getSurveysAPIPath,
  getSurveysPath,
  getXFormsAPIPath
} from './paths'

describe('paths utils', () => {
  describe('getSurveysAPIPath', () => {
    describe('without app or `core` app', () => {
      const prefix = '/core/'

      it('should return the Surveys API path', () => {
        assert.equal(getSurveysAPIPath({}), prefix + 'surveys.json?')
        assert.equal(getSurveysAPIPath({id: 1}), prefix + 'surveys/1.json')
      })

      it('should return the Surveys Stats API path', () => {
        assert.equal(getSurveysAPIPath({app: 'core', withStats: true}), prefix + 'surveys-stats.json?')
        assert.equal(getSurveysAPIPath({withStats: true, id: 1}), prefix + 'surveys-stats/1.json')
      })

      it('should return the Surveys API path with search', () => {
        assert.equal(getSurveysAPIPath({search: 'survey'}), prefix + 'surveys.json?search=survey')
      })

      it('should return the Surveys API path without search', () => {
        assert.equal(getSurveysAPIPath({app: 'core', search: 'survey', id: 1}), prefix + 'surveys/1.json')
      })
    })

    describe('with `odk-importer` app', () => {
      const prefix = '/odk-importer/'

      it('should return the Surveys API path', () => {
        assert.equal(getSurveysAPIPath({app: 'odk-importer'}), prefix + 'surveys.json?')
        assert.equal(getSurveysAPIPath({app: 'odk-importer', id: 1}), prefix + 'surveys/1.json')
      })

      it('should not return the Surveys Stats API path', () => {
        assert.equal(getSurveysAPIPath({app: 'odk-importer', withStats: true}), prefix + 'surveys.json?')
        assert.equal(getSurveysAPIPath({app: 'odk-importer', withStats: true, id: 1}), prefix + 'surveys/1.json')
      })

      it('should return the Surveys API path with search', () => {
        assert.equal(getSurveysAPIPath({app: 'odk-importer', search: 'survey'}), prefix + 'surveys.json?search=survey')
      })

      it('should return the Surveys API path without search', () => {
        assert.equal(getSurveysAPIPath({app: 'odk-importer', search: 'survey', id: 1}), prefix + 'surveys/1.json')
      })
    })
  })

  describe('getResponsesAPIPath', () => {
    const prefix = '/core/'

    it('should return the Responses API path', () => {
      assert.equal(getResponsesAPIPath({}), prefix + 'responses.json?')
    })

    it('should return the Survey Responses API path', () => {
      assert.equal(getResponsesAPIPath({surveyId: 1}), prefix + 'surveys/1/responses.json?')
    })
  })

  describe('getSurveyorsAPIPath', () => {
    const prefix = '/odk-importer/'

    it('should return the Surveyors API path', () => {
      assert.equal(getSurveyorsAPIPath({}), prefix + 'surveyors.json?')
      assert.equal(getSurveyorsAPIPath({id: 1}), prefix + 'surveyors/1.json')
    })

    it('should return the Surveyors API path filtering by survey', () => {
      assert.equal(getSurveyorsAPIPath({surveyId: 1}), prefix + 'surveyors.json?survey_id=1')
    })

    it('should return the Surveyors API path but not filtering by survey', () => {
      assert.equal(getSurveyorsAPIPath({surveyId: 1, id: 1}), prefix + 'surveyors/1.json')
    })

    it('should return the Surveyors API path with search', () => {
      assert.equal(getSurveyorsAPIPath({search: 'surveyor'}), prefix + 'surveyors.json?search=surveyor')
    })

    it('should return the Surveyors API path without search', () => {
      assert.equal(getSurveyorsAPIPath({search: 'surveyor', id: 1}), prefix + 'surveyors/1.json')
    })
  })

  describe('getXFormsAPIPath', () => {
    const prefix = '/odk-importer/'

    it('should return the xForms API path', () => {
      assert.equal(getXFormsAPIPath({}), prefix + 'xforms.json?')
    })

    it('should return the xForms API path filtering by survey', () => {
      assert.equal(getXFormsAPIPath({surveyId: 1}), prefix + 'xforms.json?survey_id=1')
    })

    it('should return the xForms API path with search', () => {
      assert.equal(getXFormsAPIPath({search: 'survey'}), prefix + 'xforms.json?search=survey')
    })
  })

  describe('getSurveysPath', () => {
    it('should return the Surveys path based on arguments', () => {
      assert.equal(getSurveysPath({}), '/surveys/list/')
      assert.equal(getSurveysPath({action: 'list'}), '/surveys/list/')
      assert.equal(getSurveysPath({action: 'list', id: 1}), '/surveys/list/')
      assert.equal(getSurveysPath({action: 'unknown-action'}), '/surveys/list/')
      assert.equal(getSurveysPath({action: 'view'}), '/surveys/list/', '"view" without "id" is "list"')
      assert.equal(getSurveysPath({action: 'view', id: 1}), '/surveys/view/1')
      assert.equal(getSurveysPath({action: 'add'}), '/surveys/add/')
      assert.equal(getSurveysPath({action: 'edit'}), '/surveys/add/', '"edit" without "id" is "add"')
      assert.equal(getSurveysPath({action: 'edit', id: 1}), '/surveys/edit/1')
    })
  })

  describe('getSurveyorsPath', () => {
    it('should return the Surveyors path based on arguments', () => {
      assert.equal(getSurveyorsPath({}), '/surveyors/list/')
      assert.equal(getSurveyorsPath({action: 'list'}), '/surveyors/list/')
      assert.equal(getSurveyorsPath({action: 'list', id: 1}), '/surveyors/list/')
      assert.equal(getSurveyorsPath({action: 'unknown-action', id: 1}), '/surveyors/list/')
      assert.equal(getSurveyorsPath({action: 'view'}), '/surveyors/list/', 'no "view" action available')
      assert.equal(getSurveyorsPath({action: 'view', id: 1}), '/surveyors/list/', 'no "view" action available')
      assert.equal(getSurveyorsPath({action: 'add'}), '/surveyors/add/')
      assert.equal(getSurveyorsPath({action: 'edit'}), '/surveyors/add/', '"edit" without "id" is "add"')
      assert.equal(getSurveyorsPath({action: 'edit', id: 1}), '/surveyors/edit/1')
    })
  })

  describe('buildQueryString', () => {
    it('should build query string path based on arguments', () => {
      assert.equal(buildQueryString(), '')
      assert.equal(buildQueryString({}), '')
      assert.equal(buildQueryString({param_1: 1}), 'param_1=1')
      assert.equal(buildQueryString({param_1: 1, param_2: 2}), 'param_1=1&param_2=2')
    })

    it('should change parameter names from titleCase to snake_case', () => {
      assert.equal(buildQueryString({param1: 1}), 'param1=1')
      assert.equal(buildQueryString({paRam: 1, parAm: 2}), 'pa_ram=1&par_am=2')
      // to take in mind:
      // - always ignore first letter
      // - joined capitalized letters are taken as a whole piece
      assert.equal(buildQueryString({Abcdef: 1}), 'abcdef=1')
      assert.equal(buildQueryString({ABCDEF: 1}), 'a_bcdef=1')
      assert.equal(buildQueryString({aBCDef: 1}), 'a_bcdef=1')
      assert.equal(buildQueryString({aBcDEf: 1}), 'a_bc_def=1')
    })

    it('should encode parameter values', () => {
      assert.equal(buildQueryString({a: '1,2 3'}), 'a=1%2C2%203')
    })
  })
})

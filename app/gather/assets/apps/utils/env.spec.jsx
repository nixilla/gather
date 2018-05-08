/* global describe, it, beforeEach, afterEach, jest */

import assert from 'assert'

const TEST_ENV = process.env

describe('environment constants', () => {
  describe('with ODK', () => {
    beforeEach(() => {
      // necessary to remove `require` cache
      jest.resetModules()

      // assign default environment variables
      process.env = Object.assign(
        {},
        process.env,
        {
          AETHER_MODULES: 'kernel,odk',
          AETHER_KERNEL_URL: 'http://kernel-test:9001',
          AETHER_ODK_URL: 'http://odk-test:9002',

          CSV_HEADER_RULES: 'replace;.;:;',
          CSV_HEADER_RULES_SEP: ';'
        }
      )
    })

    afterEach(() => {
      process.env = TEST_ENV
    })

    it('should take environment variables', () => {
      const envWithODK = require('./env')

      assert(envWithODK.ODK_ACTIVE)

      assert.deepEqual(envWithODK.AETHER_KERNEL_URL, 'http://kernel-test:9001')
      assert.deepEqual(envWithODK.AETHER_ODK_URL, 'http://odk-test:9002')

      assert.deepEqual(envWithODK.CSV_HEADER_RULES, 'replace;.;:;')
      assert.deepEqual(envWithODK.CSV_HEADER_RULES_SEP, ';')
    })
  })

  describe('without ODK', () => {
    beforeEach(() => {
      // necessary to remove `require` cache
      jest.resetModules()

      // assign default environment variables
      process.env = Object.assign(
        {},
        process.env,
        {
          AETHER_MODULES: null,
          AETHER_KERNEL_URL: 'http://kernel-test:9001',
          AETHER_ODK_URL: 'http://odk-test:9002',

          CSV_HEADER_RULES: 'replace¬.¬:¬',
          CSV_HEADER_RULES_SEP: '¬'
        }
      )
    })

    afterEach(() => {
      process.env = TEST_ENV
    })

    it('should take environment variables', () => {
      const envWithoutODK = require('./env')

      assert(!envWithoutODK.ODK_ACTIVE)

      assert.deepEqual(envWithoutODK.AETHER_KERNEL_URL, 'http://kernel-test:9001')
      assert.deepEqual(envWithoutODK.AETHER_ODK_URL, null)

      assert.deepEqual(envWithoutODK.CSV_HEADER_RULES, 'replace¬.¬:¬')
      assert.deepEqual(envWithoutODK.CSV_HEADER_RULES_SEP, '¬')
    })
  })
})

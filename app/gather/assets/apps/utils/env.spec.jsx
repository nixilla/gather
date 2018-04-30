/* global describe, it */

import assert from 'assert'

import * as env from './env'

describe('constants', () => {
  it('should take environment variables', () => {
    assert(env.ODK_ACTIVE)

    assert.deepEqual(env.CSV_HEADER_RULES, 'replace;.;:;')
    assert.deepEqual(env.CSV_HEADER_RULES_SEP, ';')

    assert.deepEqual(env.AETHER_KERNEL_URL, 'http://kernel-test:9001')
    assert.deepEqual(env.AETHER_ODK_URL, 'http://odk-test:9002')
  })
})

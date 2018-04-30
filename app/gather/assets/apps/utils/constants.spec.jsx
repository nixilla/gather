/* global describe, it */

import assert from 'assert'

import * as constants from './constants'

describe('constants', () => {
  it('should define app constants', () => {
    assert(constants.MAX_PAGE_SIZE > 0)

    assert.deepEqual(constants.KERNEL_APP, 'kernel')
    assert.deepEqual(constants.ODK_APP, 'odk')
    assert.deepEqual(constants.GATHER_APP, 'gather')
  })
})

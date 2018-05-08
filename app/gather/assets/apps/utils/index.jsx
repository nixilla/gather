
/**
 * Clones object.
 *
 * @param {*} x -- the object
 */
export const clone = (x) => JSON.parse(JSON.stringify(x))

/**
 * Checks if the two objects are equal, comparing even nested properties.
 *
 * @param {*}      a          -- object 1
 * @param {*}      b          -- object 2
 * @param {bool}   ignoreNull -- ignore null values
 */
export const deepEqual = (a, b, ignoreNull = false) => {
  if (typeof a !== 'object') {
    return a === b
  }

  let ka = Object.keys(a)
  let kb = Object.keys(b)
  let key, i

  // ignore null and undefined values
  if (ignoreNull) {
    ka = ka.filter((x) => a[x] != null)
    kb = kb.filter((x) => b[x] != null)
  }

  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length !== kb.length) {
    return false
  }

  // the same set of keys (although not necessarily the same order)
  ka.sort()
  kb.sort()

  // cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i]) {
      return false
    }
  }

  // equivalent values for every corresponding key, and possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i]
    if (!deepEqual(a[key], b[key], ignoreNull)) {
      return false
    }
  }
  return true
}

/**
 * Creates an array of numbers with the indicated start and end points.
 *
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 *
 * @param {Number} start - the start point
 * @param {Number} end   - the end point
 */
export const range = (start, end) => Array.from({length: end - start}, (v, i) => i + start)

/**
 * Sorts an array of objects by a given key value
 *
 * @param {Array of Number} array - the array of numeric values
 * @param {String}          key   - the property to sort by
 */
export const sortBy = (array, key) => array.sort((a, b) => {
  const aa = ((!key ? a : a[key]) || '').toString()
  const bb = ((!key ? b : b[key]) || '').toString()

  return aa.localeCompare(bb)
})

/**
 * Creates a random id
 */
export const generateRandomId = () => Math.random().toString(36).slice(2)

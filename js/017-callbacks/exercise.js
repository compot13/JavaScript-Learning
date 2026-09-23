/**
 * Call fn on value, then call fn on the result.
 * applyTwice((n) => n * 2, 3) returns 12.
 *
 * @param {Function} fn a function taking one argument
 * @param {*} value
 * @returns {*}
 */
export function applyTwice(fn, value) {
  throw new Error('not implemented');
}

/**
 * Return a new array with fn applied to every item. Write the loop yourself.
 * transformAll([1, 2], (n) => n * 10) returns [10, 20].
 *
 * @param {Array} items
 * @param {Function} fn
 * @returns {Array}
 */
export function transformAll(items, fn) {
  throw new Error('not implemented');
}

/**
 * Count the items the predicate answers truthily for.
 * countWhere([1, 2], (n) => n > 1) returns 1.
 *
 * @param {Array} items
 * @param {Function} predicate a function returning true or false
 * @returns {number}
 */
export function countWhere(items, predicate) {
  throw new Error('not implemented');
}

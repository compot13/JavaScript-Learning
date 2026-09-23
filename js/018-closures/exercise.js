/**
 * Return a function that multiplies its argument by factor.
 * makeMultiplier(3) returns a function where calling it with 5 gives 15.
 *
 * @param {number} factor
 * @returns {(n: number) => number}
 */
export function makeMultiplier(factor) {
  throw new Error('not implemented');
}

/**
 * Return a counting function: 1 on its first call, 2 on its second, and so on.
 * Two counters from two calls must count separately.
 *
 * @returns {() => number}
 */
export function makeCounter() {
  throw new Error('not implemented');
}

/**
 * Return a function that runs fn on its first call and returns fn's result.
 * Later calls return that same first result without calling fn again.
 *
 * @param {Function} fn
 * @returns {Function}
 */
export function once(fn) {
  throw new Error('not implemented');
}

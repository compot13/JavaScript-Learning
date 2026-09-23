/**
 * Return a promise that fulfils after ms milliseconds.
 * The value it fulfils with does not matter.
 *
 * @param {number} ms
 * @returns {Promise<*>}
 */
export function delay(ms) {
  throw new Error('not implemented');
}

/**
 * Return a promise that fulfils with n * 2 after ms milliseconds.
 *
 * @param {number} n
 * @param {number} ms
 * @returns {Promise<number>}
 */
export function doubleLater(n, ms) {
  throw new Error('not implemented');
}

/**
 * Take an array of promises of numbers and return a promise of their total.
 * An empty array gives a promise of 0.
 *
 * @param {Promise<number>[]} promises
 * @returns {Promise<number>}
 */
export function sumOfPromises(promises) {
  throw new Error('not implemented');
}

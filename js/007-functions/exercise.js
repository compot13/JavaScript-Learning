/**
 * Take a percentage off a price. The default is 10 percent.
 * applyDiscount(100) returns 90.
 *
 * @param {number} price
 * @param {number} [percentOff] how many percent to take off
 * @returns {number}
 */
export function applyDiscount(price, percentOff) {
  throw new Error('not implemented');
}

/**
 * Wrap text in an HTML tag. The default tag is p.
 * wrapInTag('hi', 'strong') returns '<strong>hi</strong>'.
 *
 * @param {string} text
 * @param {string} [tag]
 * @returns {string}
 */
export function wrapInTag(text, tag) {
  throw new Error('not implemented');
}

/**
 * Divide a by b, but return 'cannot divide by zero' when b is zero.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number|string}
 */
export function safeDivide(a, b) {
  throw new Error('not implemented');
}

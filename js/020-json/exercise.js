/**
 * Turn a value into JSON text, indented by 2 spaces.
 *
 * @param {*} value
 * @returns {string}
 */
export function toJson(value) {
  throw new Error('not implemented');
}

/**
 * Parse JSON text. Returns null when the text is not valid JSON.
 * Must not throw.
 *
 * @param {string} text
 * @returns {*}
 */
export function parseOrNull(text) {
  throw new Error('not implemented');
}

/**
 * Copy a plain object or array all the way down, so that changing a nested
 * part of the copy leaves the original alone.
 *
 * @param {*} value
 * @returns {*}
 */
export function deepCopy(value) {
  throw new Error('not implemented');
}

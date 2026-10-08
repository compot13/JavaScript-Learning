/**
 * Round a number to a set number of decimal places.
 * The result must be a number, not a string.
 * roundTo(3.14159, 2) returns 3.14
 *
 * @param {number} value
 * @param {number} places how many decimal places to keep
 * @returns {number}
 */
export function roundTo(value, places) {
  return Number(value.toFixed(places));
}

/**
 * Turn a count of minutes into hours and minutes.
 * formatMinutes(135) returns '2h 15m'
 *
 * @param {number} totalMinutes a whole number, never negative
 * @returns {string}
 */
export function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);

  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`
}

/**
 * Return true only when the value is the NaN value.
 * isBrokenNumber(Number('abc')) returns true, isBrokenNumber('abc') returns false.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isBrokenNumber(value) { 
  return Number.isNaN(value);
}

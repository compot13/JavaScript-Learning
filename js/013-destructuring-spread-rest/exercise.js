/**
 * Join a person's first and last names with a space.
 * Destructure the object in the parameter list.
 * fullName({ first: 'Ada', last: 'Lovelace' }) returns 'Ada Lovelace'.
 *
 * @param {{first: string, last: string}} person
 * @returns {string}
 */
export function fullName(person) {
  throw new Error('not implemented');
}

/**
 * Combine the defaults { colour: 'red', size: 'M' } with the settings given,
 * where the settings win. Returns a new object; does not change the argument.
 *
 * @param {object} settings
 * @returns {object}
 */
export function withDefaults(settings) {
  throw new Error('not implemented');
}

/**
 * Add up every argument it is given. No arguments totals 0.
 * sumAll(1, 2, 3) returns 6.
 *
 * @param {...number} numbers
 * @returns {number}
 */
export function sumAll(numbers) {
  throw new Error('not implemented');
}

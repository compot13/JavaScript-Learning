/**
 * Return the name of a value's type, as a string.
 * Example: typeOf(10) returns 'number'.
 *
 * @param {*} value any value at all
 * @returns {string} the type name
 */
export function typeOf(value) {
  return typeof value;
}

/**
 * Describe a variable as "name: type".
 * Example: describeVariable('count', 3) returns 'count: number'.
 *
 * @param {string} name the variable's name
 * @param {*} value the value stored in it
 * @returns {string}
 */
export function describeVariable(name, value) {
  return `${name}: ${typeof value}`;
}

/**
 * Declare a variable without giving it a value, and return that variable.
 *
 * @returns {undefined}
 */
export function initialValue() {

let value;
return value;

}

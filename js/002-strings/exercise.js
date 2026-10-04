/**
 * Build a greeting. greet('Ada') returns 'Hello, Ada!'
 *
 * @param {string} name
 * @returns {string}
 */
export function greet(name) {
  return `Hello, ${name}!`;
}

/**
 * Take a two-word name and return the initials, uppercase, separated by a dot.
 * initials('Ada Lovelace') returns 'A.L'
 *
 * @param {string} fullName two words separated by a single space
 * @returns {string}
 */
export function initials(fullName) {
  const [first, last] = fullName.split(' ');
  return `${first[0]}.${last[0]}`;
}

/**
 * Return the word with its first letter uppercase and the rest lowercase.
 * titleCase('aDA') returns 'Ada'. An empty string returns an empty string.
 *
 * @param {string} word
 * @returns {string}
 */
export function titleCase(word) {
  const firstLetter = word.slice(0, 1).toUpperCase();
  const rest = word.slice(1).toLowerCase();
  return firstLetter + rest;

}

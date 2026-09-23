/**
 * Build a book object with a title, an author, and read set to false.
 *
 * @param {string} title
 * @param {string} author
 * @returns {{title: string, author: string, read: boolean}}
 */
export function makeBook(title, author) {
  throw new Error('not implemented');
}

/**
 * Describe a book as 'Title by Author'.
 *
 * @param {{title: string, author: string}} book
 * @returns {string}
 */
export function bookLabel(book) {
  throw new Error('not implemented');
}

/**
 * Return the user's city, or 'Unknown' when there is not one.
 * Must not throw when the address is missing.
 *
 * @param {object} user
 * @returns {string}
 */
export function cityOf(user) {
  throw new Error('not implemented');
}

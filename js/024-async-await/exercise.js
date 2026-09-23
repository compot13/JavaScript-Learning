/**
 * Fetch a URL and return the title property of the JSON body.
 * Throws an Error with the message `request failed with status <status>`
 * when the response is not ok.
 *
 * @param {string} url
 * @param {Function} [fetchFn] injected so tests can supply a fake
 * @returns {Promise<string>}
 */
export async function loadTitle(url, fetchFn = fetch) {
  throw new Error('not implemented');
}

/**
 * Return the titles for several URLs, fetched at the same time rather than
 * one after another.
 *
 * @param {string[]} urls
 * @param {Function} [fetchFn]
 * @returns {Promise<string[]>}
 */
export async function loadAllTitles(urls, fetchFn = fetch) {
  throw new Error('not implemented');
}

/**
 * Return the title, or the fallback when anything at all goes wrong.
 *
 * @param {string} url
 * @param {*} fallback
 * @param {Function} [fetchFn]
 * @returns {Promise<*>}
 */
export async function loadTitleOr(url, fallback, fetchFn = fetch) {
  throw new Error('not implemented');
}

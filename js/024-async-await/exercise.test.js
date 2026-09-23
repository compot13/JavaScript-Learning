import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTitle, loadAllTitles, loadTitleOr } from './exercise.js';

/** A fake fetch that always succeeds, returning the URL as the title. */
function fakeFetch(url) {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({ title: `title for ${url}` }),
  });
}

/** A fake fetch that replies with a status but no useful body. */
function statusFetch(status) {
  return () =>
    Promise.resolve({
      ok: false,
      status,
      json: async () => ({}),
    });
}

/** A fake fetch that fails the way a lost network does. */
function brokenFetch() {
  return Promise.reject(new Error('network down'));
}

test('loadTitle returns the title from the body', async () => {
  assert.equal(await loadTitle('/1', fakeFetch), 'title for /1');
});

test('loadTitle returns a promise', () => {
  assert.ok(loadTitle('/1', fakeFetch) instanceof Promise);
});

test('loadTitle throws when the response is not ok', async () => {
  await assert.rejects(() => loadTitle('/missing', statusFetch(404)));
});

test('loadTitle puts the real status in the message', async () => {
  await assert.rejects(() => loadTitle('/missing', statusFetch(404)), {
    message: 'request failed with status 404',
  });
});

test('loadTitle reports a 500 with its own status', async () => {
  await assert.rejects(() => loadTitle('/boom', statusFetch(500)), {
    message: 'request failed with status 500',
  });
});

test('loadAllTitles returns one title per url, in order', async () => {
  assert.deepEqual(await loadAllTitles(['/1', '/2'], fakeFetch), [
    'title for /1',
    'title for /2',
  ]);
});

test('loadAllTitles returns an empty array for no urls', async () => {
  assert.deepEqual(await loadAllTitles([], fakeFetch), []);
});

test('loadAllTitles starts the requests together rather than one at a time', async () => {
  const slowFetch = (url) =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ ok: true, status: 200, json: async () => ({ title: url }) }), 40);
    });

  const before = Date.now();
  await loadAllTitles(['/1', '/2', '/3'], slowFetch);
  const elapsed = Date.now() - before;

  assert.ok(elapsed < 100, `three 40ms requests took ${elapsed}ms, so they ran one after another`);
});

test('loadTitleOr returns the title when the request works', async () => {
  assert.equal(await loadTitleOr('/1', 'none', fakeFetch), 'title for /1');
});

test('loadTitleOr returns the fallback for a bad status', async () => {
  assert.equal(await loadTitleOr('/missing', 'none', statusFetch(404)), 'none');
});

test('loadTitleOr returns the fallback when the request itself fails', async () => {
  assert.equal(await loadTitleOr('/1', 'none', brokenFetch), 'none');
});

test('loadTitleOr returns the fallback when the body will not parse', async () => {
  const badBody = () =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError('Unexpected token');
      },
    });

  assert.equal(await loadTitleOr('/1', 'none', badBody), 'none');
});

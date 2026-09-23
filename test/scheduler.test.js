import test from 'node:test';
import assert from 'node:assert/strict';
import { itemsForToday, nextArticle, nextEligible } from '../src/scheduler.js';
import { deal, finish, DONE } from '../src/progress.js';

/** A small stand-in syllabus, so these tests do not move when content is added. */
function fakeSyllabus() {
  const items = [
    { id: 'js-001', track: 'js', order: 0, kind: 'exercise', title: 'One', folder: 'js/001-one', teaches: 'a', requires: [], authored: true },
    { id: 'js-002', track: 'js', order: 1, kind: 'exercise', title: 'Two', folder: 'js/002-two', teaches: 'b', requires: ['js-001'], authored: true },
    { id: 'js-003', track: 'js', order: 2, kind: 'exercise', title: 'Three', folder: 'js/003-three', teaches: 'c', requires: ['js-002'], authored: false },
    { id: 'lc-0001', track: 'leetcode', order: 0, kind: 'exercise', title: 'Hard-ish', folder: 'leetcode/0001-a', teaches: 'd', requires: ['js-002'], authored: true },
    { id: 'lc-0002', track: 'leetcode', order: 1, kind: 'exercise', title: 'Easy', folder: 'leetcode/0002-b', teaches: 'e', requires: [], authored: true },
    { id: 'basics-001', track: 'basics', order: 0, kind: 'article', title: 'Reading', folder: 'basics/001-r.md', teaches: 'f', dueBefore: 'js-002', authored: true },
  ];
  return { tracks: {}, items };
}

function emptyProgress() {
  return { version: 1, items: {} };
}

test('deals one item per track on a fresh day', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();
  const { items, fresh } = itemsForToday(syllabus, progress, new Date(2026, 8, 20, 9));

  assert.equal(fresh, true);
  assert.deepEqual(items.map((item) => item.id), ['js-001', 'lc-0002']);
});

test('skips a problem whose required lesson is unfinished', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();
  const { item } = nextEligible(syllabus, progress, 'leetcode');

  // lc-0001 comes first in the syllabus but needs js-002, which is not done.
  assert.equal(item.id, 'lc-0002');
});

test('offers the gated problem once its lesson is finished', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();
  finish(progress, 'js-001', DONE, new Date(2026, 8, 19, 10));
  finish(progress, 'js-002', DONE, new Date(2026, 8, 19, 11));

  assert.equal(nextEligible(syllabus, progress, 'leetcode').item.id, 'lc-0001');
});

test('reports a track blocked by content that is not written yet', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();
  finish(progress, 'js-001', DONE, new Date(2026, 8, 19, 10));
  finish(progress, 'js-002', DONE, new Date(2026, 8, 19, 11));

  const { item, blocked } = nextEligible(syllabus, progress, 'js');
  assert.equal(item, undefined);
  assert.equal(blocked.id, 'js-003');
});

test('running today twice in one day returns the same items', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();
  const now = new Date(2026, 8, 20, 9);

  const first = itemsForToday(syllabus, progress, now);
  const second = itemsForToday(syllabus, progress, new Date(2026, 8, 20, 21));

  assert.equal(second.fresh, false);
  assert.deepEqual(
    second.items.map((item) => item.id),
    first.items.map((item) => item.id),
  );
});

test('an unfinished item carries over to the next day', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();
  itemsForToday(syllabus, progress, new Date(2026, 8, 20, 9));

  const { items } = itemsForToday(syllabus, progress, new Date(2026, 8, 21, 9));
  assert.deepEqual(items.map((item) => item.id), ['js-001', 'lc-0002']);
});

test('a finished item is replaced by the next one the following day', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();
  itemsForToday(syllabus, progress, new Date(2026, 8, 20, 9));
  finish(progress, 'js-001', DONE, new Date(2026, 8, 20, 18));
  finish(progress, 'lc-0002', DONE, new Date(2026, 8, 20, 19));

  const { items, notes } = itemsForToday(syllabus, progress, new Date(2026, 8, 21, 9));
  // lc-0001 still waits for js-002, which is only being dealt today.
  assert.deepEqual(items.map((item) => item.id), ['js-002', 'basics-001']);
  assert.deepEqual(notes, [
    { track: 'leetcode', reason: 'waiting', item: syllabus.items[3], missing: ['js-002'] },
  ]);
});

test('an article is held back until the course reaches it', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();

  // basics-001 is due before js-002, and today deals js-001.
  assert.equal(nextArticle(syllabus, progress, syllabus.items[0]), null);
  assert.equal(nextArticle(syllabus, progress, syllabus.items[1]).id, 'basics-001');
});

test('a finished article is not dealt again', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();
  finish(progress, 'basics-001', DONE, new Date(2026, 8, 20, 10));

  assert.equal(nextArticle(syllabus, progress, syllabus.items[1]), null);
});

test('dealt items are recorded as open', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();
  itemsForToday(syllabus, progress, new Date(2026, 8, 20, 9));

  assert.equal(progress.items['js-001'].status, 'open');
  assert.equal(progress.items['js-001'].dealtOn, '2026-09-20');
});

test('an item already open is not re-dealt with a new start time', () => {
  const syllabus = fakeSyllabus();
  const progress = emptyProgress();
  deal(progress, 'js-001', new Date(2026, 8, 19, 9));
  const started = progress.items['js-001'].startedAt;

  itemsForToday(syllabus, progress, new Date(2026, 8, 20, 9));
  assert.equal(progress.items['js-001'].startedAt, started);
});

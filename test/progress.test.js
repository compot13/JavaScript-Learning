import test from 'node:test';
import assert from 'node:assert/strict';
import { dateKey, deal, finish, finishedOn, isFinished, openIds, statusOf, streak, DONE, SOLVED_WITH_HELP } from '../src/progress.js';

function emptyProgress() {
  return { version: 1, items: {} };
}

test('formats a date as a local YYYY-MM-DD key', () => {
  assert.equal(dateKey(new Date(2026, 8, 20, 23, 30)), '2026-09-20');
});

test('dealing an item opens it and records the day', () => {
  const progress = emptyProgress();
  deal(progress, 'js-001', new Date(2026, 8, 20, 9));
  assert.equal(statusOf(progress, 'js-001'), 'open');
  assert.equal(progress.items['js-001'].dealtOn, '2026-09-20');
  assert.deepEqual(openIds(progress), ['js-001']);
});

test('dealing an item twice keeps the original start time', () => {
  const progress = emptyProgress();
  deal(progress, 'js-001', new Date(2026, 8, 20, 9));
  const first = progress.items['js-001'].startedAt;
  deal(progress, 'js-001', new Date(2026, 8, 21, 9));
  assert.equal(progress.items['js-001'].startedAt, first);
});

test('dealing does not reopen a finished item', () => {
  const progress = emptyProgress();
  finish(progress, 'js-001', DONE, new Date(2026, 8, 20, 10));
  deal(progress, 'js-001', new Date(2026, 8, 21, 9));
  assert.equal(statusOf(progress, 'js-001'), DONE);
});

test('finishing records the time and counts as finished', () => {
  const progress = emptyProgress();
  deal(progress, 'js-001', new Date(2026, 8, 20, 9));
  finish(progress, 'js-001', DONE, new Date(2026, 8, 20, 10));
  assert.ok(isFinished(progress, 'js-001'));
  assert.deepEqual(openIds(progress), []);
  assert.deepEqual(finishedOn(progress, '2026-09-20'), ['js-001']);
});

test('solved with help still counts as finished', () => {
  const progress = emptyProgress();
  finish(progress, 'js-002', SOLVED_WITH_HELP, new Date(2026, 8, 20, 10));
  assert.ok(isFinished(progress, 'js-002'));
});

test('a streak counts consecutive days back from today', () => {
  const now = new Date(2026, 8, 20, 12);
  const progress = emptyProgress();
  finish(progress, 'a', DONE, new Date(2026, 8, 18, 10));
  finish(progress, 'b', DONE, new Date(2026, 8, 19, 10));
  finish(progress, 'c', DONE, new Date(2026, 8, 20, 10));
  assert.equal(streak(progress, now), 3);
});

test('a day with nothing finished yet does not break yesterday streak', () => {
  const now = new Date(2026, 8, 20, 12);
  const progress = emptyProgress();
  finish(progress, 'a', DONE, new Date(2026, 8, 18, 10));
  finish(progress, 'b', DONE, new Date(2026, 8, 19, 10));
  assert.equal(streak(progress, now), 2);
});

test('a two day gap ends the streak', () => {
  const now = new Date(2026, 8, 20, 12);
  const progress = emptyProgress();
  finish(progress, 'a', DONE, new Date(2026, 8, 15, 10));
  assert.equal(streak(progress, now), 0);
});

test('an empty record has no streak', () => {
  assert.equal(streak(emptyProgress(), new Date(2026, 8, 20)), 0);
});

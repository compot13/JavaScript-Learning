import test from 'node:test';
import assert from 'node:assert/strict';
import { applyTwice, transformAll, countWhere } from './exercise.js';

test('applyTwice doubles twice', () => {
  assert.equal(
    applyTwice((n) => n * 2, 3),
    12,
  );
});

test('applyTwice works on strings', () => {
  assert.equal(
    applyTwice((s) => s + '!', 'hi'),
    'hi!!',
  );
});

test('applyTwice calls the function exactly twice', () => {
  let calls = 0;
  applyTwice((n) => {
    calls += 1;
    return n;
  }, 1);
  assert.equal(calls, 2);
});

test('applyTwice passes the first result into the second call', () => {
  assert.equal(
    applyTwice((n) => n + 1, 0),
    2,
  );
});

test('transformAll applies the function to every item', () => {
  assert.deepEqual(
    transformAll([1, 2, 3], (n) => n * 10),
    [10, 20, 30],
  );
});

test('transformAll returns an empty array for an empty array', () => {
  assert.deepEqual(
    transformAll([], (n) => n),
    [],
  );
});

test('transformAll can change the type of the items', () => {
  assert.deepEqual(
    transformAll([1, 2], (n) => `#${n}`),
    ['#1', '#2'],
  );
});

test('transformAll leaves the original array alone', () => {
  const numbers = [1, 2];
  transformAll(numbers, (n) => n * 2);
  assert.deepEqual(numbers, [1, 2]);
});

test('countWhere counts the matching items', () => {
  assert.equal(
    countWhere([1, 2, 3, 4], (n) => n % 2 === 0),
    2,
  );
});

test('countWhere returns 0 when nothing matches', () => {
  assert.equal(
    countWhere([1, 3], (n) => n % 2 === 0),
    0,
  );
});

test('countWhere returns 0 for an empty array', () => {
  assert.equal(
    countWhere([], () => true),
    0,
  );
});

test('countWhere counts every item when the predicate always passes', () => {
  assert.equal(
    countWhere([1, 2, 3], () => true),
    3,
  );
});

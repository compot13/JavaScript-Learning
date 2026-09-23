import test from 'node:test';
import assert from 'node:assert/strict';
import { fromArray, toArray } from './list.js';
import { reverseList } from './exercise.js';

test('reverseList reverses a list of five', () => {
  const head = fromArray([1, 2, 3, 4, 5]);
  assert.deepEqual(toArray(reverseList(head)), [5, 4, 3, 2, 1]);
});

test('reverseList reverses a list of two', () => {
  assert.deepEqual(toArray(reverseList(fromArray([1, 2]))), [2, 1]);
});

test('reverseList leaves a single node alone', () => {
  assert.deepEqual(toArray(reverseList(fromArray([1]))), [1]);
});

test('reverseList returns null for an empty list', () => {
  assert.equal(reverseList(null), null);
});

test('reverseList gives the new tail a next of null', () => {
  const reversed = reverseList(fromArray([1, 2, 3]));
  assert.equal(reversed.next.next.next, null);
});

test('reverseList returns the last node as the new head', () => {
  const reversed = reverseList(fromArray([7, 8, 9]));
  assert.equal(reversed.val, 9);
});

test('reverseList reuses the original nodes rather than building new ones', () => {
  const head = fromArray([1, 2]);
  const second = head.next;
  assert.equal(reverseList(head), second);
});

test('reverseList handles repeated values', () => {
  assert.deepEqual(toArray(reverseList(fromArray([1, 1, 2]))), [2, 1, 1]);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { fromArray, toArray } from './list.js';
import { mergeTwoLists } from './exercise.js';

test('mergeTwoLists merges the example lists', () => {
  const merged = mergeTwoLists(fromArray([1, 2, 4]), fromArray([1, 3, 4]));
  assert.deepEqual(toArray(merged), [1, 1, 2, 3, 4, 4]);
});

test('mergeTwoLists returns null when both lists are empty', () => {
  assert.equal(mergeTwoLists(null, null), null);
});

test('mergeTwoLists returns the other list when the first is empty', () => {
  assert.deepEqual(toArray(mergeTwoLists(null, fromArray([0]))), [0]);
});

test('mergeTwoLists returns the other list when the second is empty', () => {
  assert.deepEqual(toArray(mergeTwoLists(fromArray([1, 2]), null)), [1, 2]);
});

test('mergeTwoLists handles lists of different lengths', () => {
  const merged = mergeTwoLists(fromArray([1]), fromArray([2, 3, 4]));
  assert.deepEqual(toArray(merged), [1, 2, 3, 4]);
});

test('mergeTwoLists handles one list entirely before the other', () => {
  const merged = mergeTwoLists(fromArray([1, 2]), fromArray([8, 9]));
  assert.deepEqual(toArray(merged), [1, 2, 8, 9]);
});

test('mergeTwoLists handles repeated values across both lists', () => {
  const merged = mergeTwoLists(fromArray([2, 2]), fromArray([2, 2]));
  assert.deepEqual(toArray(merged), [2, 2, 2, 2]);
});

test('mergeTwoLists reuses the nodes it was given', () => {
  const first = fromArray([1]);
  const merged = mergeTwoLists(first, fromArray([2]));
  assert.equal(merged, first);
});

test('mergeTwoLists ends the merged list with null', () => {
  const merged = mergeTwoLists(fromArray([1]), fromArray([2]));
  assert.equal(merged.next.next, null);
});

test('mergeTwoLists handles negative values', () => {
  const merged = mergeTwoLists(fromArray([-3, 1]), fromArray([-2, 0]));
  assert.deepEqual(toArray(merged), [-3, -2, 0, 1]);
});

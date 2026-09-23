import test from 'node:test';
import assert from 'node:assert/strict';
import { lastItem, withoutFirst, countOf } from './exercise.js';

test('lastItem returns the final item', () => {
  assert.equal(lastItem(['a', 'b']), 'b');
});

test('lastItem works on a single item array', () => {
  assert.equal(lastItem([7]), 7);
});

test('lastItem returns undefined for an empty array', () => {
  assert.equal(lastItem([]), undefined);
});

test('withoutFirst drops the first item', () => {
  assert.deepEqual(withoutFirst(['a', 'b', 'c']), ['b', 'c']);
});

test('withoutFirst returns an empty array for an empty array', () => {
  assert.deepEqual(withoutFirst([]), []);
});

test('withoutFirst returns an empty array for a single item array', () => {
  assert.deepEqual(withoutFirst(['only']), []);
});

test('withoutFirst leaves the original array unchanged', () => {
  const original = ['a', 'b', 'c'];
  withoutFirst(original);
  assert.deepEqual(original, ['a', 'b', 'c']);
});

test('withoutFirst returns a different array, not the same one', () => {
  const original = ['a', 'b'];
  assert.notEqual(withoutFirst(original), original);
});

test('countOf counts repeated values', () => {
  assert.equal(countOf(['a', 'b', 'a'], 'a'), 2);
});

test('countOf returns 0 when the value is missing', () => {
  assert.equal(countOf([1, 2, 3], 9), 0);
});

test('countOf returns 0 for an empty array', () => {
  assert.equal(countOf([], 'a'), 0);
});

test('countOf counts numbers', () => {
  assert.equal(countOf([1, 1, 1, 2], 1), 3);
});

test('countOf does not match a string against a number', () => {
  assert.equal(countOf([1, 2, 3], '1'), 0);
});

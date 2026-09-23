import test from 'node:test';
import assert from 'node:assert/strict';
import { doubleAll, longWords, hasNegative } from './exercise.js';

test('doubleAll doubles every number', () => {
  assert.deepEqual(doubleAll([1, 2, 3]), [2, 4, 6]);
});

test('doubleAll returns an empty array for an empty array', () => {
  assert.deepEqual(doubleAll([]), []);
});

test('doubleAll handles negative numbers and zero', () => {
  assert.deepEqual(doubleAll([-1, 0]), [-2, 0]);
});

test('doubleAll leaves the original array unchanged', () => {
  const numbers = [1, 2];
  doubleAll(numbers);
  assert.deepEqual(numbers, [1, 2]);
});

test('longWords keeps words at or above the length', () => {
  assert.deepEqual(longWords(['hi', 'hello', 'hey'], 3), ['hello', 'hey']);
});

test('longWords counts the minimum length itself as long enough', () => {
  assert.deepEqual(longWords(['abc'], 3), ['abc']);
});

test('longWords returns an empty array when nothing is long enough', () => {
  assert.deepEqual(longWords(['a', 'b'], 5), []);
});

test('longWords returns an empty array for an empty array', () => {
  assert.deepEqual(longWords([], 3), []);
});

test('hasNegative is true when one number is below zero', () => {
  assert.equal(hasNegative([1, -2, 3]), true);
});

test('hasNegative is false when every number is positive', () => {
  assert.equal(hasNegative([1, 2, 3]), false);
});

test('hasNegative treats zero as not negative', () => {
  assert.equal(hasNegative([0, 1]), false);
});

test('hasNegative is false for an empty array', () => {
  assert.equal(hasNegative([]), false);
});

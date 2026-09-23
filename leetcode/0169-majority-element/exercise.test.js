import test from 'node:test';
import assert from 'node:assert/strict';
import { majorityElement } from './exercise.js';

test('majorityElement finds the value in a short array', () => {
  assert.equal(majorityElement([3, 2, 3]), 3);
});

test('majorityElement finds the value in a longer array', () => {
  assert.equal(majorityElement([2, 2, 1, 1, 1, 2, 2]), 2);
});

test('majorityElement handles a single item', () => {
  assert.equal(majorityElement([1]), 1);
});

test('majorityElement handles every item being the same', () => {
  assert.equal(majorityElement([6, 6, 6]), 6);
});

test('majorityElement finds a value that starts late', () => {
  assert.equal(majorityElement([1, 2, 2, 2]), 2);
});

test('majorityElement handles negative numbers', () => {
  assert.equal(majorityElement([-1, -1, 2]), -1);
});

test('majorityElement returns the value, not its count', () => {
  assert.equal(majorityElement([5, 5, 5, 1]), 5);
});

test('majorityElement leaves the array unchanged', () => {
  const nums = [3, 2, 3];
  majorityElement(nums);
  assert.deepEqual(nums, [3, 2, 3]);
});

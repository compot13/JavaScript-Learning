import test from 'node:test';
import assert from 'node:assert/strict';
import { missingNumber } from './exercise.js';

test('missingNumber finds a number in the middle', () => {
  assert.equal(missingNumber([3, 0, 1]), 2);
});

test('missingNumber finds a missing top of the range', () => {
  assert.equal(missingNumber([0, 1]), 2);
});

test('missingNumber handles a longer jumbled array', () => {
  assert.equal(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]), 8);
});

test('missingNumber finds 1 when the array is only zero', () => {
  assert.equal(missingNumber([0]), 1);
});

test('missingNumber finds 0 when the array is only one', () => {
  assert.equal(missingNumber([1]), 0);
});

test('missingNumber finds a missing zero in a longer array', () => {
  assert.equal(missingNumber([3, 1, 2]), 0);
});

test('missingNumber does not sort the array it was given', () => {
  const nums = [3, 0, 1];
  missingNumber(nums);
  assert.deepEqual(nums, [3, 0, 1]);
});

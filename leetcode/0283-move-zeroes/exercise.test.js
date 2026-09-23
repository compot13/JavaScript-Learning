import test from 'node:test';
import assert from 'node:assert/strict';
import { moveZeroes } from './exercise.js';

test('moveZeroes moves zeroes to the end of the example', () => {
  const nums = [0, 1, 0, 3, 12];
  moveZeroes(nums);
  assert.deepEqual(nums, [1, 3, 12, 0, 0]);
});

test('moveZeroes keeps the order of the other numbers', () => {
  const nums = [0, 5, 0, 4, 0, 3];
  moveZeroes(nums);
  assert.deepEqual(nums, [5, 4, 3, 0, 0, 0]);
});

test('moveZeroes leaves an array with no zeroes alone', () => {
  const nums = [1, 2, 3];
  moveZeroes(nums);
  assert.deepEqual(nums, [1, 2, 3]);
});

test('moveZeroes handles an array of only zeroes', () => {
  const nums = [0, 0];
  moveZeroes(nums);
  assert.deepEqual(nums, [0, 0]);
});

test('moveZeroes handles a single zero', () => {
  const nums = [0];
  moveZeroes(nums);
  assert.deepEqual(nums, [0]);
});

test('moveZeroes handles an empty array', () => {
  const nums = [];
  moveZeroes(nums);
  assert.deepEqual(nums, []);
});

test('moveZeroes keeps the array the same length', () => {
  const nums = [0, 1, 0];
  moveZeroes(nums);
  assert.equal(nums.length, 3);
});

test('moveZeroes changes the array it was given', () => {
  const nums = [0, 1];
  const same = nums;
  moveZeroes(nums);
  assert.deepEqual(same, [1, 0]);
});

test('moveZeroes handles negative numbers', () => {
  const nums = [0, -1, 0, -2];
  moveZeroes(nums);
  assert.deepEqual(nums, [-1, -2, 0, 0]);
});

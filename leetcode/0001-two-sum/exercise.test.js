import test from 'node:test';
import assert from 'node:assert/strict';
import { twoSum } from './exercise.js';

test('twoSum finds the first two numbers', () => {
  assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
});

test('twoSum finds a pair that is not at the start', () => {
  assert.deepEqual(twoSum([3, 2, 4], 6), [1, 2]);
});

test('twoSum handles two equal numbers without reusing one', () => {
  assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
});

test('twoSum returns the smaller index first', () => {
  const [first, second] = twoSum([1, 5, 3], 8);
  assert.ok(first < second);
});

test('twoSum handles negative numbers', () => {
  assert.deepEqual(twoSum([-3, 4, 3, 90], 0), [0, 2]);
});

test('twoSum finds a pair at the end of a longer array', () => {
  assert.deepEqual(twoSum([1, 2, 3, 4, 5], 9), [3, 4]);
});

test('twoSum returns indexes, not the numbers', () => {
  assert.deepEqual(twoSum([10, 20], 30), [0, 1]);
});

test('twoSum leaves the array unchanged', () => {
  const nums = [2, 7, 11, 15];
  twoSum(nums, 9);
  assert.deepEqual(nums, [2, 7, 11, 15]);
});

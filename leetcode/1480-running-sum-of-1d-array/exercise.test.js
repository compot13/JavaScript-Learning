import test from 'node:test';
import assert from 'node:assert/strict';
import { runningSum } from './exercise.js';

test('runningSum builds the totals for the example', () => {
  assert.deepEqual(runningSum([1, 2, 3, 4]), [1, 3, 6, 10]);
});

test('runningSum counts up for an array of ones', () => {
  assert.deepEqual(runningSum([1, 1, 1, 1]), [1, 2, 3, 4]);
});

test('runningSum handles a larger last number', () => {
  assert.deepEqual(runningSum([3, 1, 2, 10]), [3, 4, 6, 16]);
});

test('runningSum returns the number itself for a single item', () => {
  assert.deepEqual(runningSum([5]), [5]);
});

test('runningSum returns an empty array for an empty array', () => {
  assert.deepEqual(runningSum([]), []);
});

test('runningSum handles negative numbers', () => {
  assert.deepEqual(runningSum([1, -1, 2]), [1, 0, 2]);
});

test('runningSum returns an array the same length as the input', () => {
  assert.equal(runningSum([1, 2, 3]).length, 3);
});

test('runningSum leaves the original array unchanged', () => {
  const nums = [1, 2, 3];
  runningSum(nums);
  assert.deepEqual(nums, [1, 2, 3]);
});

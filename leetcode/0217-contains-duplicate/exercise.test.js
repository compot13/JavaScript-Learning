import test from 'node:test';
import assert from 'node:assert/strict';
import { containsDuplicate } from './exercise.js';

test('containsDuplicate is true when a value repeats', () => {
  assert.equal(containsDuplicate([1, 2, 3, 1]), true);
});

test('containsDuplicate is false when every value is different', () => {
  assert.equal(containsDuplicate([1, 2, 3, 4]), false);
});

test('containsDuplicate is true with several repeats', () => {
  assert.equal(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]), true);
});

test('containsDuplicate is false for an empty array', () => {
  assert.equal(containsDuplicate([]), false);
});

test('containsDuplicate is false for a single value', () => {
  assert.equal(containsDuplicate([1]), false);
});

test('containsDuplicate is true for two of the same value', () => {
  assert.equal(containsDuplicate([2, 2]), true);
});

test('containsDuplicate handles negative numbers', () => {
  assert.equal(containsDuplicate([-1, -2, -1]), true);
});

test('containsDuplicate spots a repeat at the very end', () => {
  assert.equal(containsDuplicate([1, 2, 3, 4, 5, 1]), true);
});

test('containsDuplicate leaves the array unchanged', () => {
  const nums = [1, 2, 1];
  containsDuplicate(nums);
  assert.deepEqual(nums, [1, 2, 1]);
});

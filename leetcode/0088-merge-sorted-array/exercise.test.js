import test from 'node:test';
import assert from 'node:assert/strict';
import { merge } from './exercise.js';

test('merge interleaves the example arrays', () => {
  const nums1 = [1, 2, 3, 0, 0, 0];
  merge(nums1, 3, [2, 5, 6], 3);
  assert.deepEqual(nums1, [1, 2, 2, 3, 5, 6]);
});

test('merge handles an empty second array', () => {
  const nums1 = [1];
  merge(nums1, 1, [], 0);
  assert.deepEqual(nums1, [1]);
});

test('merge handles an empty first array', () => {
  const nums1 = [0];
  merge(nums1, 0, [1], 1);
  assert.deepEqual(nums1, [1]);
});

test('merge puts every number of nums2 in front when they are smaller', () => {
  const nums1 = [4, 5, 6, 0, 0, 0];
  merge(nums1, 3, [1, 2, 3], 3);
  assert.deepEqual(nums1, [1, 2, 3, 4, 5, 6]);
});

test('merge puts every number of nums2 at the end when they are larger', () => {
  const nums1 = [1, 2, 3, 0, 0, 0];
  merge(nums1, 3, [4, 5, 6], 3);
  assert.deepEqual(nums1, [1, 2, 3, 4, 5, 6]);
});

test('merge handles repeated values', () => {
  const nums1 = [2, 2, 0, 0];
  merge(nums1, 2, [2, 2], 2);
  assert.deepEqual(nums1, [2, 2, 2, 2]);
});

test('merge handles negative numbers', () => {
  const nums1 = [-1, 3, 0, 0];
  merge(nums1, 2, [-2, 0], 2);
  assert.deepEqual(nums1, [-2, -1, 0, 3]);
});

test('merge changes the array it was given', () => {
  const nums1 = [1, 0];
  const same = nums1;
  merge(nums1, 1, [2], 1);
  assert.deepEqual(same, [1, 2]);
});

test('merge leaves nums2 unchanged', () => {
  const nums2 = [2, 5, 6];
  merge([1, 2, 3, 0, 0, 0], 3, nums2, 3);
  assert.deepEqual(nums2, [2, 5, 6]);
});

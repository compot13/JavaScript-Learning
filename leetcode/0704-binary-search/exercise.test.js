import test from 'node:test';
import assert from 'node:assert/strict';
import { search } from './exercise.js';

test('search finds a number in the middle of the array', () => {
  assert.equal(search([-1, 0, 3, 5, 9, 12], 9), 4);
});

test('search returns -1 for a number that is not there', () => {
  assert.equal(search([-1, 0, 3, 5, 9, 12], 2), -1);
});

test('search finds the first item', () => {
  assert.equal(search([-1, 0, 3, 5, 9, 12], -1), 0);
});

test('search finds the last item', () => {
  assert.equal(search([-1, 0, 3, 5, 9, 12], 12), 5);
});

test('search finds the only item of a single item array', () => {
  assert.equal(search([5], 5), 0);
});

test('search returns -1 when the single item does not match', () => {
  assert.equal(search([5], 2), -1);
});

test('search returns -1 for an empty array', () => {
  assert.equal(search([], 1), -1);
});

test('search returns -1 for a target above every item', () => {
  assert.equal(search([1, 2, 3], 99), -1);
});

test('search returns -1 for a target below every item', () => {
  assert.equal(search([1, 2, 3], -99), -1);
});

test('search finds every item of an even length array', () => {
  const nums = [2, 4, 6, 8];
  assert.equal(search(nums, 2), 0);
  assert.equal(search(nums, 4), 1);
  assert.equal(search(nums, 6), 2);
  assert.equal(search(nums, 8), 3);
});

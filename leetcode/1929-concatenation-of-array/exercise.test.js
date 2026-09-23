import test from 'node:test';
import assert from 'node:assert/strict';
import { getConcatenation } from './exercise.js';

test('getConcatenation repeats the example array', () => {
  assert.deepEqual(getConcatenation([1, 2, 1]), [1, 2, 1, 1, 2, 1]);
});

test('getConcatenation repeats a two item array', () => {
  assert.deepEqual(getConcatenation([1, 3]), [1, 3, 1, 3]);
});

test('getConcatenation repeats a single item', () => {
  assert.deepEqual(getConcatenation([7]), [7, 7]);
});

test('getConcatenation returns an empty array for an empty array', () => {
  assert.deepEqual(getConcatenation([]), []);
});

test('getConcatenation returns an array of twice the length', () => {
  assert.equal(getConcatenation([1, 2, 3]).length, 6);
});

test('getConcatenation leaves the original array unchanged', () => {
  const nums = [1, 2];
  getConcatenation(nums);
  assert.deepEqual(nums, [1, 2]);
});

test('getConcatenation returns a different array from the one given', () => {
  const nums = [1, 2];
  assert.notEqual(getConcatenation(nums), nums);
});

test('getConcatenation keeps the order within each copy', () => {
  assert.deepEqual(getConcatenation([3, 1, 2]), [3, 1, 2, 3, 1, 2]);
});

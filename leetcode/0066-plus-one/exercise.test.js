import test from 'node:test';
import assert from 'node:assert/strict';
import { plusOne } from './exercise.js';

test('plusOne adds one to the last digit', () => {
  assert.deepEqual(plusOne([1, 2, 3]), [1, 2, 4]);
});

test('plusOne carries into the next column', () => {
  assert.deepEqual(plusOne([4, 3, 9]), [4, 4, 0]);
});

test('plusOne grows the array for a single nine', () => {
  assert.deepEqual(plusOne([9]), [1, 0]);
});

test('plusOne grows the array when every digit is nine', () => {
  assert.deepEqual(plusOne([9, 9]), [1, 0, 0]);
});

test('plusOne carries through several nines', () => {
  assert.deepEqual(plusOne([1, 9, 9]), [2, 0, 0]);
});

test('plusOne handles a single digit', () => {
  assert.deepEqual(plusOne([0]), [1]);
});

test('plusOne leaves the original array unchanged', () => {
  const digits = [9, 9];
  plusOne(digits);
  assert.deepEqual(digits, [9, 9]);
});

test('plusOne stays exact for a long number', () => {
  const digits = [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3];
  assert.deepEqual(plusOne(digits), [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 4]);
});

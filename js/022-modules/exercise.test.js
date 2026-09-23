import test from 'node:test';
import assert from 'node:assert/strict';
import { totalCircleArea, describeSquare, PI } from './exercise.js';

test('PI is re-exported with the value from geometry.js', () => {
  assert.equal(PI, 3.14159);
});

test('totalCircleArea adds up two circles', () => {
  assert.equal(totalCircleArea([1, 2]), 15.70795);
});

test('totalCircleArea returns 0 for an empty array', () => {
  assert.equal(totalCircleArea([]), 0);
});

test('totalCircleArea handles a single circle', () => {
  assert.equal(totalCircleArea([2]), 12.56636);
});

test('describeSquare describes a square of 3', () => {
  assert.equal(describeSquare(3), 'square with an area of 9');
});

test('describeSquare describes a square of 5', () => {
  assert.equal(describeSquare(5), 'square with an area of 25');
});

test('describeSquare handles a side of zero', () => {
  assert.equal(describeSquare(0), 'square with an area of 0');
});

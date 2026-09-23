import test from 'node:test';
import assert from 'node:assert/strict';
import { maxProfit } from './exercise.js';

test('maxProfit finds the best trade in the example', () => {
  assert.equal(maxProfit([7, 1, 5, 3, 6, 4]), 5);
});

test('maxProfit returns 0 when prices only fall', () => {
  assert.equal(maxProfit([7, 6, 4, 3, 1]), 0);
});

test('maxProfit respects the order of the days', () => {
  assert.equal(maxProfit([2, 9, 1]), 7);
});

test('maxProfit returns 0 for an empty array', () => {
  assert.equal(maxProfit([]), 0);
});

test('maxProfit returns 0 for a single day', () => {
  assert.equal(maxProfit([5]), 0);
});

test('maxProfit returns 0 when every price is the same', () => {
  assert.equal(maxProfit([3, 3, 3]), 0);
});

test('maxProfit handles the best sale on the last day', () => {
  assert.equal(maxProfit([3, 2, 6, 5, 0, 3]), 4);
});

test('maxProfit handles a rising market', () => {
  assert.equal(maxProfit([1, 2, 3, 4]), 3);
});

test('maxProfit leaves the array unchanged', () => {
  const prices = [7, 1, 5];
  maxProfit(prices);
  assert.deepEqual(prices, [7, 1, 5]);
});

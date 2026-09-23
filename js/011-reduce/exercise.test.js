import test from 'node:test';
import assert from 'node:assert/strict';
import { sumOf, productOf, longestWord } from './exercise.js';

test('sumOf adds the numbers', () => {
  assert.equal(sumOf([1, 2, 3]), 6);
});

test('sumOf returns 0 for an empty array', () => {
  assert.equal(sumOf([]), 0);
});

test('sumOf handles negative numbers', () => {
  assert.equal(sumOf([5, -3]), 2);
});

test('sumOf returns the number itself for one item', () => {
  assert.equal(sumOf([7]), 7);
});

test('productOf multiplies the numbers', () => {
  assert.equal(productOf([2, 3, 4]), 24);
});

test('productOf returns 1 for an empty array', () => {
  assert.equal(productOf([]), 1);
});

test('productOf returns 0 when one of the numbers is 0', () => {
  assert.equal(productOf([5, 0, 2]), 0);
});

test('productOf returns the number itself for one item', () => {
  assert.equal(productOf([6]), 6);
});

test('longestWord finds the longest word', () => {
  assert.equal(longestWord(['hi', 'hello', 'hey']), 'hello');
});

test('longestWord keeps the first of two equal lengths', () => {
  assert.equal(longestWord(['aa', 'bb']), 'aa');
});

test('longestWord returns an empty string for an empty array', () => {
  assert.equal(longestWord([]), '');
});

test('longestWord works when the longest word is last', () => {
  assert.equal(longestWord(['a', 'bb', 'ccc']), 'ccc');
});

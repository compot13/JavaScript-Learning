import test from 'node:test';
import assert from 'node:assert/strict';
import { reverseString } from './exercise.js';

test('reverseString reverses an odd number of characters', () => {
  const s = ['h', 'e', 'l', 'l', 'o'];
  reverseString(s);
  assert.deepEqual(s, ['o', 'l', 'l', 'e', 'h']);
});

test('reverseString reverses an even number of characters', () => {
  const s = ['a', 'b', 'c', 'd'];
  reverseString(s);
  assert.deepEqual(s, ['d', 'c', 'b', 'a']);
});

test('reverseString leaves a single character alone', () => {
  const s = ['a'];
  reverseString(s);
  assert.deepEqual(s, ['a']);
});

test('reverseString handles an empty array', () => {
  const s = [];
  reverseString(s);
  assert.deepEqual(s, []);
});

test('reverseString changes the array it was given', () => {
  const s = ['a', 'b'];
  const same = s;
  reverseString(s);
  assert.deepEqual(same, ['b', 'a']);
});

test('reverseString keeps the array the same length', () => {
  const s = ['a', 'b', 'c'];
  reverseString(s);
  assert.equal(s.length, 3);
});

test('reverseString handles repeated characters', () => {
  const s = ['a', 'a', 'b'];
  reverseString(s);
  assert.deepEqual(s, ['b', 'a', 'a']);
});

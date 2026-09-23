import test from 'node:test';
import assert from 'node:assert/strict';
import { isHappy } from './exercise.js';

test('isHappy is true for 19', () => {
  assert.equal(isHappy(19), true);
});

test('isHappy is false for 2', () => {
  assert.equal(isHappy(2), false);
});

test('isHappy is true for 1', () => {
  assert.equal(isHappy(1), true);
});

test('isHappy is true for 7', () => {
  assert.equal(isHappy(7), true);
});

test('isHappy is false for 4, which is in the repeating cycle', () => {
  assert.equal(isHappy(4), false);
});

test('isHappy is true for 100', () => {
  assert.equal(isHappy(100), true);
});

test('isHappy is false for 3', () => {
  assert.equal(isHappy(3), false);
});

test('isHappy handles a large number without hanging', () => {
  const before = Date.now();
  assert.equal(isHappy(999999999), false);
  assert.ok(Date.now() - before < 200, 'isHappy should detect the loop quickly');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { isValid } from './exercise.js';

test('isValid accepts a single pair', () => {
  assert.equal(isValid('()'), true);
});

test('isValid accepts three pairs side by side', () => {
  assert.equal(isValid('()[]{}'), true);
});

test('isValid rejects a mismatched pair', () => {
  assert.equal(isValid('(]'), false);
});

test('isValid rejects overlapping pairs', () => {
  assert.equal(isValid('([)]'), false);
});

test('isValid accepts nested pairs', () => {
  assert.equal(isValid('{[]}'), true);
});

test('isValid accepts an empty string', () => {
  assert.equal(isValid(''), true);
});

test('isValid rejects an opener that is never closed', () => {
  assert.equal(isValid('('), false);
});

test('isValid rejects a closer with nothing open', () => {
  assert.equal(isValid(')'), false);
});

test('isValid rejects a trailing unclosed opener', () => {
  assert.equal(isValid('()['), false);
});

test('isValid accepts deep nesting', () => {
  assert.equal(isValid('{[()()]}'), true);
});

test('isValid rejects a closer after everything has closed', () => {
  assert.equal(isValid('())'), false);
});

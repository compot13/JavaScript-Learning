import test from 'node:test';
import assert from 'node:assert/strict';
import { isSubsequence } from './exercise.js';

test('isSubsequence accepts characters spread through the string', () => {
  assert.equal(isSubsequence('abc', 'ahbgdc'), true);
});

test('isSubsequence rejects a character that is not there', () => {
  assert.equal(isSubsequence('axc', 'ahbgdc'), false);
});

test('isSubsequence rejects characters in the wrong order', () => {
  assert.equal(isSubsequence('aec', 'abcde'), false);
});

test('isSubsequence accepts the empty string', () => {
  assert.equal(isSubsequence('', 'abc'), true);
});

test('isSubsequence accepts the empty string against an empty string', () => {
  assert.equal(isSubsequence('', ''), true);
});

test('isSubsequence rejects anything against an empty string', () => {
  assert.equal(isSubsequence('abc', ''), false);
});

test('isSubsequence accepts a string against itself', () => {
  assert.equal(isSubsequence('abc', 'abc'), true);
});

test('isSubsequence rejects a longer s than t', () => {
  assert.equal(isSubsequence('abcd', 'abc'), false);
});

test('isSubsequence handles repeated characters', () => {
  assert.equal(isSubsequence('aa', 'ababa'), true);
});

test('isSubsequence rejects when there are too few repeats', () => {
  assert.equal(isSubsequence('aaa', 'aa'), false);
});

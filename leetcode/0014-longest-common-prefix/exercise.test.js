import test from 'node:test';
import assert from 'node:assert/strict';
import { longestCommonPrefix } from './exercise.js';

test('longestCommonPrefix finds the shared start of the example', () => {
  assert.equal(longestCommonPrefix(['flower', 'flow', 'flight']), 'fl');
});

test('longestCommonPrefix returns an empty string when nothing is shared', () => {
  assert.equal(longestCommonPrefix(['dog', 'racecar', 'car']), '');
});

test('longestCommonPrefix returns the word itself for a single word', () => {
  assert.equal(longestCommonPrefix(['a']), 'a');
});

test('longestCommonPrefix returns the whole word when both are the same', () => {
  assert.equal(longestCommonPrefix(['ab', 'ab']), 'ab');
});

test('longestCommonPrefix handles one word being a prefix of the other', () => {
  assert.equal(longestCommonPrefix(['ab', 'abc']), 'ab');
});

test('longestCommonPrefix handles the shorter word coming first', () => {
  assert.equal(longestCommonPrefix(['abc', 'ab']), 'ab');
});

test('longestCommonPrefix returns an empty string when one word is empty', () => {
  assert.equal(longestCommonPrefix(['', 'abc']), '');
});

test('longestCommonPrefix handles a single character shared', () => {
  assert.equal(longestCommonPrefix(['cir', 'car']), 'c');
});

test('longestCommonPrefix leaves the array unchanged', () => {
  const words = ['flower', 'flow'];
  longestCommonPrefix(words);
  assert.deepEqual(words, ['flower', 'flow']);
});

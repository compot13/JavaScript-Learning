import test from 'node:test';
import assert from 'node:assert/strict';
import { lengthOfLastWord } from './exercise.js';

test('lengthOfLastWord handles two plain words', () => {
  assert.equal(lengthOfLastWord('Hello World'), 5);
});

test('lengthOfLastWord ignores spaces at both ends', () => {
  assert.equal(lengthOfLastWord('   fly me   to   the moon  '), 4);
});

test('lengthOfLastWord handles four words', () => {
  assert.equal(lengthOfLastWord('luffy is still joyboy'), 6);
});

test('lengthOfLastWord handles a single letter', () => {
  assert.equal(lengthOfLastWord('a'), 1);
});

test('lengthOfLastWord handles a single word with a trailing space', () => {
  assert.equal(lengthOfLastWord('day '), 3);
});

test('lengthOfLastWord handles several spaces between words', () => {
  assert.equal(lengthOfLastWord('a    bcd'), 3);
});

test('lengthOfLastWord handles a leading space', () => {
  assert.equal(lengthOfLastWord(' hi'), 2);
});

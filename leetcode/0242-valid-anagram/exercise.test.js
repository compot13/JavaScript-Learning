import test from 'node:test';
import assert from 'node:assert/strict';
import { isAnagram } from './exercise.js';

test('isAnagram accepts a rearrangement', () => {
  assert.equal(isAnagram('anagram', 'nagaram'), true);
});

test('isAnagram rejects different letters', () => {
  assert.equal(isAnagram('rat', 'car'), false);
});

test('isAnagram rejects a longer second word', () => {
  assert.equal(isAnagram('a', 'ab'), false);
});

test('isAnagram rejects a longer first word', () => {
  assert.equal(isAnagram('ab', 'a'), false);
});

test('isAnagram accepts two empty strings', () => {
  assert.equal(isAnagram('', ''), true);
});

test('isAnagram accepts a word against itself', () => {
  assert.equal(isAnagram('abc', 'abc'), true);
});

test('isAnagram counts repeats, not just which letters appear', () => {
  assert.equal(isAnagram('aabb', 'abbb'), false);
});

test('isAnagram handles a single letter', () => {
  assert.equal(isAnagram('a', 'a'), true);
});

test('isAnagram rejects a single letter that differs', () => {
  assert.equal(isAnagram('a', 'b'), false);
});

test('isAnagram handles a longer pair', () => {
  assert.equal(isAnagram('listensilent', 'silentlisten'), true);
});

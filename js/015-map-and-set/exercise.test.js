import test from 'node:test';
import assert from 'node:assert/strict';
import { unique, countWords, firstRepeated } from './exercise.js';

test('unique removes duplicate numbers', () => {
  assert.deepEqual(unique([1, 2, 2, 3, 1]), [1, 2, 3]);
});

test('unique keeps the order of first appearance', () => {
  assert.deepEqual(unique(['c', 'a', 'c', 'b']), ['c', 'a', 'b']);
});

test('unique returns an empty array for an empty array', () => {
  assert.deepEqual(unique([]), []);
});

test('unique returns an array, not a Set', () => {
  assert.ok(Array.isArray(unique([1, 1])));
});

test('unique leaves an array with no duplicates alone', () => {
  assert.deepEqual(unique([1, 2, 3]), [1, 2, 3]);
});

test('countWords counts a repeated word', () => {
  assert.equal(countWords(['a', 'b', 'a']).get('a'), 2);
});

test('countWords counts a word that appears once', () => {
  assert.equal(countWords(['a', 'b', 'a']).get('b'), 1);
});

test('countWords returns a Map', () => {
  assert.ok(countWords(['a']) instanceof Map);
});

test('countWords has one entry per distinct word', () => {
  assert.equal(countWords(['a', 'b', 'a']).size, 2);
});

test('countWords returns an empty Map for an empty array', () => {
  assert.equal(countWords([]).size, 0);
});

test('countWords returns undefined for a word that is not there', () => {
  assert.equal(countWords(['a']).get('z'), undefined);
});

test('firstRepeated finds the earliest second appearance', () => {
  assert.equal(firstRepeated(['a', 'b', 'a', 'b']), 'a');
});

test('firstRepeated returns the value repeated soonest, not the first item', () => {
  assert.equal(firstRepeated(['a', 'b', 'b', 'a']), 'b');
});

test('firstRepeated returns undefined when everything is different', () => {
  assert.equal(firstRepeated(['a', 'b', 'c']), undefined);
});

test('firstRepeated returns undefined for an empty array', () => {
  assert.equal(firstRepeated([]), undefined);
});

test('firstRepeated works with numbers', () => {
  assert.equal(firstRepeated([3, 1, 4, 1]), 1);
});

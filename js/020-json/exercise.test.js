import test from 'node:test';
import assert from 'node:assert/strict';
import { toJson, parseOrNull, deepCopy } from './exercise.js';

test('toJson returns a string', () => {
  assert.equal(typeof toJson({ a: 1 }), 'string');
});

test('toJson indents by two spaces', () => {
  assert.equal(toJson({ a: 1 }), '{\n  "a": 1\n}');
});

test('toJson handles nested values', () => {
  assert.equal(toJson({ a: [1] }), '{\n  "a": [\n    1\n  ]\n}');
});

test('toJson handles an array at the top level', () => {
  assert.equal(toJson([1, 2]), '[\n  1,\n  2\n]');
});

test('parseOrNull parses valid JSON', () => {
  assert.deepEqual(parseOrNull('{"a":1}'), { a: 1 });
});

test('parseOrNull parses an array', () => {
  assert.deepEqual(parseOrNull('[1,2]'), [1, 2]);
});

test('parseOrNull returns null for text that is not JSON', () => {
  assert.equal(parseOrNull('nope'), null);
});

test('parseOrNull returns null for an empty string', () => {
  assert.equal(parseOrNull(''), null);
});

test('parseOrNull returns null for JSON with single quotes', () => {
  assert.equal(parseOrNull("{'a':1}"), null);
});

test('parseOrNull does not throw on bad input', () => {
  assert.doesNotThrow(() => parseOrNull('{'));
});

test('deepCopy copies the top level', () => {
  assert.deepEqual(deepCopy({ a: 1 }), { a: 1 });
});

test('deepCopy returns a different object', () => {
  const original = { a: 1 };
  assert.notEqual(deepCopy(original), original);
});

test('deepCopy does not share nested objects', () => {
  const original = { address: { city: 'London' } };
  const copy = deepCopy(original);
  copy.address.city = 'Paris';
  assert.equal(original.address.city, 'London');
});

test('deepCopy copies arrays', () => {
  const original = [[1], [2]];
  const copy = deepCopy(original);
  copy[0][0] = 99;
  assert.equal(original[0][0], 1);
});

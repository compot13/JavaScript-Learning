import test from 'node:test';
import assert from 'node:assert/strict';
import { countProperties, totalValues, describeAll } from './exercise.js';

test('countProperties counts two properties', () => {
  assert.equal(countProperties({ a: 1, b: 2 }), 2);
});

test('countProperties returns 0 for an empty object', () => {
  assert.equal(countProperties({}), 0);
});

test('countProperties counts properties holding falsy values', () => {
  assert.equal(countProperties({ a: 0, b: '', c: false }), 3);
});

test('totalValues adds the values', () => {
  assert.equal(totalValues({ ada: 10, grace: 8 }), 18);
});

test('totalValues returns 0 for an empty object', () => {
  assert.equal(totalValues({}), 0);
});

test('totalValues handles a single property', () => {
  assert.equal(totalValues({ only: 4 }), 4);
});

test('totalValues handles negative values', () => {
  assert.equal(totalValues({ a: 5, b: -2 }), 3);
});

test('describeAll writes each property as key colon value', () => {
  assert.deepEqual(describeAll({ ada: 10, grace: 8 }), ['ada: 10', 'grace: 8']);
});

test('describeAll returns an empty array for an empty object', () => {
  assert.deepEqual(describeAll({}), []);
});

test('describeAll keeps the order the keys were written in', () => {
  assert.deepEqual(describeAll({ z: 1, a: 2 }), ['z: 1', 'a: 2']);
});

test('describeAll works with string values', () => {
  assert.deepEqual(describeAll({ city: 'London' }), ['city: London']);
});

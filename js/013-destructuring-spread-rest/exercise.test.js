import test from 'node:test';
import assert from 'node:assert/strict';
import { fullName, withDefaults, sumAll } from './exercise.js';

test('fullName joins the two names with a space', () => {
  assert.equal(fullName({ first: 'Ada', last: 'Lovelace' }), 'Ada Lovelace');
});

test('fullName ignores other properties on the object', () => {
  assert.equal(fullName({ first: 'Grace', last: 'Hopper', age: 45 }), 'Grace Hopper');
});

test('withDefaults fills in both defaults when given an empty object', () => {
  assert.deepEqual(withDefaults({}), { colour: 'red', size: 'M' });
});

test('withDefaults lets a setting override a default', () => {
  assert.deepEqual(withDefaults({ size: 'L' }), { colour: 'red', size: 'L' });
});

test('withDefaults keeps extra settings that have no default', () => {
  assert.deepEqual(withDefaults({ gift: true }), { colour: 'red', size: 'M', gift: true });
});

test('withDefaults does not change the object it was given', () => {
  const settings = { size: 'L' };
  withDefaults(settings);
  assert.deepEqual(settings, { size: 'L' });
});

test('withDefaults returns a new object each time', () => {
  assert.notEqual(withDefaults({}), withDefaults({}));
});

test('sumAll adds three arguments', () => {
  assert.equal(sumAll(1, 2, 3), 6);
});

test('sumAll returns 0 with no arguments', () => {
  assert.equal(sumAll(), 0);
});

test('sumAll returns the number itself for one argument', () => {
  assert.equal(sumAll(7), 7);
});

test('sumAll handles negative numbers', () => {
  assert.equal(sumAll(5, -2, -3), 0);
});

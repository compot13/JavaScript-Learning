import test from 'node:test';
import assert from 'node:assert/strict';
import { typeOf, describeVariable, initialValue } from './exercise.js';

test('typeOf names the type of a string', () => {
  assert.equal(typeOf('Ada'), 'string');
});

test('typeOf names the type of a number', () => {
  assert.equal(typeOf(10), 'number');
});

test('typeOf names the type of a boolean', () => {
  assert.equal(typeOf(false), 'boolean');
});

test('typeOf names the type of undefined', () => {
  assert.equal(typeOf(undefined), 'undefined');
});

test('typeOf reports null as an object, as JavaScript does', () => {
  assert.equal(typeOf(null), 'object');
});

test('describeVariable writes the name, a colon, a space, then the type', () => {
  assert.equal(describeVariable('count', 3), 'count: number');
});

test('describeVariable works for a string value', () => {
  assert.equal(describeVariable('user', 'Ada'), 'user: string');
});

test('describeVariable works for a boolean value', () => {
  assert.equal(describeVariable('isReady', true), 'isReady: boolean');
});

test('initialValue returns undefined', () => {
  assert.equal(initialValue(), undefined);
});

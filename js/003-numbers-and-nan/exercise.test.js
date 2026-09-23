import test from 'node:test';
import assert from 'node:assert/strict';
import { roundTo, formatMinutes, isBrokenNumber } from './exercise.js';

test('roundTo keeps two decimal places', () => {
  assert.equal(roundTo(3.14159, 2), 3.14);
});

test('roundTo rounds up when the next digit is 5', () => {
  assert.equal(roundTo(2.345, 2), 2.35);
});

test('roundTo with zero places gives a whole number', () => {
  assert.equal(roundTo(2.5, 0), 3);
});

test('roundTo returns a number, not a string', () => {
  assert.equal(typeof roundTo(1.234, 1), 'number');
});

test('roundTo leaves a number that is already short enough alone', () => {
  assert.equal(roundTo(5, 2), 5);
});

test('formatMinutes splits minutes into hours and minutes', () => {
  assert.equal(formatMinutes(135), '2h 15m');
});

test('formatMinutes shows zero hours for under an hour', () => {
  assert.equal(formatMinutes(45), '0h 45m');
});

test('formatMinutes shows zero minutes for a whole number of hours', () => {
  assert.equal(formatMinutes(120), '2h 0m');
});

test('formatMinutes handles zero', () => {
  assert.equal(formatMinutes(0), '0h 0m');
});

test('isBrokenNumber is true for a failed conversion', () => {
  assert.equal(isBrokenNumber(Number('abc')), true);
});

test('isBrokenNumber is false for an ordinary number', () => {
  assert.equal(isBrokenNumber(7), false);
});

test('isBrokenNumber is false for a string that is not a number', () => {
  assert.equal(isBrokenNumber('abc'), false);
});

test('isBrokenNumber is false for undefined', () => {
  assert.equal(isBrokenNumber(undefined), false);
});

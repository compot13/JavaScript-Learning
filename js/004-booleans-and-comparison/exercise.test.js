import test from 'node:test';
import assert from 'node:assert/strict';
import { isAdult, isBlank, canRentCar } from './exercise.js';

test('isAdult is true at exactly 18', () => {
  assert.equal(isAdult(18), true);
});

test('isAdult is true above 18', () => {
  assert.equal(isAdult(40), true);
});

test('isAdult is false below 18', () => {
  assert.equal(isAdult(17), false);
});

test('isAdult is false at zero', () => {
  assert.equal(isAdult(0), false);
});

test('isBlank is true for an empty string', () => {
  assert.equal(isBlank(''), true);
});

test('isBlank is true for spaces only', () => {
  assert.equal(isBlank('   '), true);
});

test('isBlank is false when there is text', () => {
  assert.equal(isBlank(' hi '), false);
});

test('isBlank is false for a single character', () => {
  assert.equal(isBlank('a'), false);
});

test('canRentCar is true for an old enough driver with a licence', () => {
  assert.equal(canRentCar(25, true), true);
});

test('canRentCar is true at exactly 21', () => {
  assert.equal(canRentCar(21, true), true);
});

test('canRentCar is false without a licence', () => {
  assert.equal(canRentCar(25, false), false);
});

test('canRentCar is false when too young', () => {
  assert.equal(canRentCar(19, true), false);
});

test('canRentCar returns a boolean, not the licence value', () => {
  assert.equal(canRentCar(19, false), false);
});

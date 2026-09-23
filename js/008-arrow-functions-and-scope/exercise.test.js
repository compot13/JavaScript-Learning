import test from 'node:test';
import assert from 'node:assert/strict';
import { double, initialsOf, nextId } from './exercise.js';

test('double returns twice the number', () => {
  assert.equal(double(5), 10);
});

test('double handles zero', () => {
  assert.equal(double(0), 0);
});

test('double handles negative numbers', () => {
  assert.equal(double(-3), -6);
});

test('initialsOf uppercases both initials', () => {
  assert.equal(initialsOf('ada lovelace'), 'AL');
});

test('initialsOf leaves already uppercase initials alone', () => {
  assert.equal(initialsOf('Grace Hopper'), 'GH');
});

test('initialsOf works with words of different lengths', () => {
  assert.equal(initialsOf('al khwarizmi'), 'AK');
});

test('nextId starts at 1 and counts up on each call', () => {
  // These calls share one counter, so the order of this test matters.
  assert.equal(nextId(), 1);
  assert.equal(nextId(), 2);
  assert.equal(nextId(), 3);
});

test('nextId keeps counting from where it left off', () => {
  assert.equal(nextId(), 4);
});

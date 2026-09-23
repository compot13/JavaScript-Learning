import test from 'node:test';
import assert from 'node:assert/strict';
import { fib } from './exercise.js';

test('fib(0) is 0', () => {
  assert.equal(fib(0), 0);
});

test('fib(1) is 1', () => {
  assert.equal(fib(1), 1);
});

test('fib(2) is 1', () => {
  assert.equal(fib(2), 1);
});

test('fib(3) is 2', () => {
  assert.equal(fib(3), 2);
});

test('fib(6) is 8', () => {
  assert.equal(fib(6), 8);
});

test('fib(10) is 55', () => {
  assert.equal(fib(10), 55);
});

test('fib(30) is 832040', () => {
  assert.equal(fib(30), 832040);
});

test('fib(50) is exact and fast', () => {
  const before = Date.now();
  assert.equal(fib(50), 12586269025);
  assert.ok(Date.now() - before < 100, 'fib(50) should be almost instant');
});

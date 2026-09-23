import test from 'node:test';
import assert from 'node:assert/strict';
import { climbStairs } from './exercise.js';

test('one step has one route', () => {
  assert.equal(climbStairs(1), 1);
});

test('two steps have two routes', () => {
  assert.equal(climbStairs(2), 2);
});

test('three steps have three routes', () => {
  assert.equal(climbStairs(3), 3);
});

test('four steps have five routes', () => {
  assert.equal(climbStairs(4), 5);
});

test('five steps have eight routes', () => {
  assert.equal(climbStairs(5), 8);
});

test('ten steps have eighty nine routes', () => {
  assert.equal(climbStairs(10), 89);
});

test('forty five steps is exact and fast', () => {
  const before = Date.now();
  assert.equal(climbStairs(45), 1836311903);
  assert.ok(Date.now() - before < 100, 'climbStairs(45) should be almost instant');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { makeMultiplier, makeCounter, once } from './exercise.js';

test('makeMultiplier returns a function', () => {
  assert.equal(typeof makeMultiplier(2), 'function');
});

test('makeMultiplier multiplies by the factor it was given', () => {
  assert.equal(makeMultiplier(3)(5), 15);
});

test('two multipliers keep their own factors', () => {
  const double = makeMultiplier(2);
  const triple = makeMultiplier(3);
  assert.equal(double(10), 20);
  assert.equal(triple(10), 30);
});

test('makeCounter counts up from 1', () => {
  const next = makeCounter();
  assert.equal(next(), 1);
  assert.equal(next(), 2);
  assert.equal(next(), 3);
});

test('two counters count separately', () => {
  const first = makeCounter();
  const second = makeCounter();
  first();
  first();
  assert.equal(second(), 1);
  assert.equal(first(), 3);
});

test('once returns the result of the first call', () => {
  const start = once((n) => n * 2);
  assert.equal(start(5), 10);
});

test('once returns the first result again on later calls', () => {
  const start = once((n) => n * 2);
  start(5);
  assert.equal(start(9), 10);
});

test('once calls the function exactly one time', () => {
  let calls = 0;
  const run = once(() => {
    calls += 1;
    return 'done';
  });
  run();
  run();
  run();
  assert.equal(calls, 1);
});

test('once passes every argument through on the first call', () => {
  const add = once((a, b) => a + b);
  assert.equal(add(2, 3), 5);
});

test('two functions wrapped by once are independent', () => {
  const first = once((n) => n);
  const second = once((n) => n);
  first(1);
  assert.equal(second(2), 2);
});

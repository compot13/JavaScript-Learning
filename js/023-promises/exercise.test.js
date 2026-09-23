import test from 'node:test';
import assert from 'node:assert/strict';
import { delay, doubleLater, sumOfPromises } from './exercise.js';

test('delay returns a promise', () => {
  assert.ok(delay(1) instanceof Promise);
});

test('delay fulfils', async () => {
  await delay(1);
});

test('delay actually waits', async () => {
  const before = Date.now();
  await delay(30);
  assert.ok(Date.now() - before >= 25, 'delay(30) returned too quickly');
});

test('doubleLater returns a promise', () => {
  assert.ok(doubleLater(1, 1) instanceof Promise);
});

test('doubleLater fulfils with the doubled number', async () => {
  assert.equal(await doubleLater(5, 1), 10);
});

test('doubleLater handles zero', async () => {
  assert.equal(await doubleLater(0, 1), 0);
});

test('doubleLater waits before fulfilling', async () => {
  const before = Date.now();
  await doubleLater(1, 30);
  assert.ok(Date.now() - before >= 25, 'doubleLater waited too little');
});

test('sumOfPromises adds the fulfilled values', async () => {
  assert.equal(await sumOfPromises([Promise.resolve(1), Promise.resolve(2)]), 3);
});

test('sumOfPromises returns 0 for an empty array', async () => {
  assert.equal(await sumOfPromises([]), 0);
});

test('sumOfPromises waits for slow promises', async () => {
  assert.equal(await sumOfPromises([doubleLater(1, 20), doubleLater(2, 5)]), 6);
});

test('sumOfPromises returns a promise rather than a number', () => {
  assert.ok(sumOfPromises([]) instanceof Promise);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { fromArray } from './tree.js';
import { maxDepth } from './exercise.js';

test('maxDepth measures the example tree', () => {
  assert.equal(maxDepth(fromArray([3, 9, 20, null, null, 15, 7])), 3);
});

test('maxDepth measures a tree that leans right', () => {
  assert.equal(maxDepth(fromArray([1, null, 2])), 2);
});

test('maxDepth returns 0 for an empty tree', () => {
  assert.equal(maxDepth(null), 0);
});

test('maxDepth returns 1 for a single node', () => {
  assert.equal(maxDepth(fromArray([1])), 1);
});

test('maxDepth takes the longer side, not the sum', () => {
  assert.equal(maxDepth(fromArray([1, 2, 3])), 2);
});

test('maxDepth handles a long left-leaning chain', () => {
  assert.equal(maxDepth(fromArray([1, 2, null, 3, null, 4])), 4);
});

test('maxDepth handles an unbalanced tree', () => {
  assert.equal(maxDepth(fromArray([1, 2, 3, 4, null, null, null, 5])), 4);
});

test('maxDepth handles a full tree of three levels', () => {
  assert.equal(maxDepth(fromArray([1, 2, 3, 4, 5, 6, 7])), 3);
});

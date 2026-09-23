import test from 'node:test';
import assert from 'node:assert/strict';
import { canConstruct } from './exercise.js';

test('canConstruct rejects a letter that is not there', () => {
  assert.equal(canConstruct('a', 'b'), false);
});

test('canConstruct counts repeats rather than presence', () => {
  assert.equal(canConstruct('aa', 'ab'), false);
});

test('canConstruct accepts a note the magazine can cover', () => {
  assert.equal(canConstruct('aa', 'aab'), true);
});

test('canConstruct accepts an empty note', () => {
  assert.equal(canConstruct('', 'abc'), true);
});

test('canConstruct rejects any note against an empty magazine', () => {
  assert.equal(canConstruct('a', ''), false);
});

test('canConstruct accepts an empty note against an empty magazine', () => {
  assert.equal(canConstruct('', ''), true);
});

test('canConstruct allows leftover letters in the magazine', () => {
  assert.equal(canConstruct('ab', 'aabbcc'), true);
});

test('canConstruct rejects a note longer than the magazine', () => {
  assert.equal(canConstruct('abc', 'ab'), false);
});

test('canConstruct ignores the order of the letters', () => {
  assert.equal(canConstruct('cba', 'abc'), true);
});

test('canConstruct handles a longer example', () => {
  assert.equal(canConstruct('fihjjjjei', 'hjibagacbhadfaefdjaeaebgi'), false);
});

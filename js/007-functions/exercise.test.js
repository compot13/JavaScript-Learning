import test from 'node:test';
import assert from 'node:assert/strict';
import { applyDiscount, wrapInTag, safeDivide } from './exercise.js';

test('applyDiscount takes 10 percent off by default', () => {
  assert.equal(applyDiscount(100), 90);
});

test('applyDiscount takes the percentage it is given', () => {
  assert.equal(applyDiscount(50, 50), 25);
});

test('applyDiscount with zero percent leaves the price alone', () => {
  assert.equal(applyDiscount(80, 0), 80);
});

test('applyDiscount with a hundred percent gives zero', () => {
  assert.equal(applyDiscount(80, 100), 0);
});

test('wrapInTag uses a p tag by default', () => {
  assert.equal(wrapInTag('hi'), '<p>hi</p>');
});

test('wrapInTag uses the tag it is given', () => {
  assert.equal(wrapInTag('hi', 'strong'), '<strong>hi</strong>');
});

test('wrapInTag handles empty text', () => {
  assert.equal(wrapInTag('', 'div'), '<div></div>');
});

test('safeDivide divides two numbers', () => {
  assert.equal(safeDivide(10, 2), 5);
});

test('safeDivide keeps the decimal part', () => {
  assert.equal(safeDivide(7, 2), 3.5);
});

test('safeDivide refuses to divide by zero', () => {
  assert.equal(safeDivide(10, 0), 'cannot divide by zero');
});

test('safeDivide still refuses when the top is zero as well', () => {
  assert.equal(safeDivide(0, 0), 'cannot divide by zero');
});

test('safeDivide returns zero when the top is zero and the bottom is not', () => {
  assert.equal(safeDivide(0, 5), 0);
});

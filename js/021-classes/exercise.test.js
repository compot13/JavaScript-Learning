import test from 'node:test';
import assert from 'node:assert/strict';
import { Rectangle } from './exercise.js';

test('the constructor stores the width and the height', () => {
  const rectangle = new Rectangle(2, 3);
  assert.equal(rectangle.width, 2);
  assert.equal(rectangle.height, 3);
});

test('area multiplies the two sides', () => {
  assert.equal(new Rectangle(2, 3).area(), 6);
});

test('area works for a rectangle with a side of zero', () => {
  assert.equal(new Rectangle(0, 5).area(), 0);
});

test('perimeter adds both sides twice', () => {
  assert.equal(new Rectangle(2, 3).perimeter(), 10);
});

test('two rectangles keep their own measurements', () => {
  const small = new Rectangle(2, 3);
  const large = new Rectangle(4, 5);
  assert.equal(small.area(), 6);
  assert.equal(large.area(), 20);
});

test('scale returns a rectangle with both sides multiplied', () => {
  const scaled = new Rectangle(2, 3).scale(2);
  assert.equal(scaled.width, 4);
  assert.equal(scaled.height, 6);
});

test('scale leaves the original rectangle alone', () => {
  const rectangle = new Rectangle(2, 3);
  rectangle.scale(10);
  assert.equal(rectangle.width, 2);
});

test('scale returns a Rectangle, so its methods still work', () => {
  const scaled = new Rectangle(2, 3).scale(2);
  assert.ok(scaled instanceof Rectangle);
  assert.equal(scaled.area(), 24);
});

test('square builds a rectangle with equal sides', () => {
  const square = Rectangle.square(4);
  assert.equal(square.width, 4);
  assert.equal(square.height, 4);
});

test('square returns a Rectangle', () => {
  assert.ok(Rectangle.square(4) instanceof Rectangle);
  assert.equal(Rectangle.square(4).area(), 16);
});

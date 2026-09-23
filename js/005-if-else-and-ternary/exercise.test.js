import test from 'node:test';
import assert from 'node:assert/strict';
import { grade, ticketPrice, pluralise } from './exercise.js';

test('grade gives an A for 95', () => {
  assert.equal(grade(95), 'A');
});

test('grade gives an A at exactly 90', () => {
  assert.equal(grade(90), 'A');
});

test('grade gives a B at exactly 70', () => {
  assert.equal(grade(70), 'B');
});

test('grade gives a B at 89', () => {
  assert.equal(grade(89), 'B');
});

test('grade gives a C at 50', () => {
  assert.equal(grade(50), 'C');
});

test('grade gives an F at 49', () => {
  assert.equal(grade(49), 'F');
});

test('grade gives an F at zero', () => {
  assert.equal(grade(0), 'F');
});

test('ticketPrice is free under 5', () => {
  assert.equal(ticketPrice(3), 0);
});

test('ticketPrice charges the child rate at exactly 5', () => {
  assert.equal(ticketPrice(5), 8);
});

test('ticketPrice charges the child rate at 17', () => {
  assert.equal(ticketPrice(17), 8);
});

test('ticketPrice charges the adult rate at 18', () => {
  assert.equal(ticketPrice(18), 12);
});

test('ticketPrice charges the adult rate at 64', () => {
  assert.equal(ticketPrice(64), 12);
});

test('ticketPrice charges the older rate at exactly 65', () => {
  assert.equal(ticketPrice(65), 9);
});

test('pluralise leaves the word alone for one item', () => {
  assert.equal(pluralise(1, 'file'), '1 file');
});

test('pluralise adds an s for several items', () => {
  assert.equal(pluralise(3, 'file'), '3 files');
});

test('pluralise adds an s for zero items', () => {
  assert.equal(pluralise(0, 'file'), '0 files');
});

test('pluralise works with any word', () => {
  assert.equal(pluralise(2, 'box'), '2 boxs');
});

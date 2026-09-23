import test from 'node:test';
import assert from 'node:assert/strict';
import { makeBook, bookLabel, cityOf } from './exercise.js';

test('makeBook stores the title and author', () => {
  assert.deepEqual(makeBook('Ariadne', 'Jennifer Saint'), {
    title: 'Ariadne',
    author: 'Jennifer Saint',
    read: false,
  });
});

test('makeBook always starts unread', () => {
  assert.equal(makeBook('a', 'b').read, false);
});

test('makeBook builds a new object each time', () => {
  assert.notEqual(makeBook('a', 'b'), makeBook('a', 'b'));
});

test('bookLabel joins the title and author with the word by', () => {
  assert.equal(
    bookLabel({ title: 'Ariadne', author: 'Jennifer Saint' }),
    'Ariadne by Jennifer Saint',
  );
});

test('bookLabel works on a book made by makeBook', () => {
  assert.equal(bookLabel(makeBook('Piranesi', 'Susanna Clarke')), 'Piranesi by Susanna Clarke');
});

test('cityOf reads a city that is there', () => {
  assert.equal(cityOf({ address: { city: 'London' } }), 'London');
});

test('cityOf returns Unknown when there is no address', () => {
  assert.equal(cityOf({ name: 'Ada' }), 'Unknown');
});

test('cityOf returns Unknown when the address has no city', () => {
  assert.equal(cityOf({ address: {} }), 'Unknown');
});

test('cityOf returns Unknown for an empty object', () => {
  assert.equal(cityOf({}), 'Unknown');
});

test('cityOf keeps a city that is an empty string', () => {
  assert.equal(cityOf({ address: { city: '' } }), '');
});

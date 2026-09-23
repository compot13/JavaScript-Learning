import test from 'node:test';
import assert from 'node:assert/strict';
import { sortedNumbers, sortedByLength, sortedByAge } from './exercise.js';

test('sortedNumbers puts numbers in order', () => {
  assert.deepEqual(sortedNumbers([10, 9, 1]), [1, 9, 10]);
});

test('sortedNumbers sorts by value, not by text', () => {
  assert.deepEqual(sortedNumbers([2, 10, 1]), [1, 2, 10]);
});

test('sortedNumbers handles negative numbers', () => {
  assert.deepEqual(sortedNumbers([3, -1, 0]), [-1, 0, 3]);
});

test('sortedNumbers returns an empty array for an empty array', () => {
  assert.deepEqual(sortedNumbers([]), []);
});

test('sortedNumbers leaves the original array alone', () => {
  const numbers = [10, 9, 1];
  sortedNumbers(numbers);
  assert.deepEqual(numbers, [10, 9, 1]);
});

test('sortedByLength puts the shortest word first', () => {
  assert.deepEqual(sortedByLength(['ccc', 'a', 'bb']), ['a', 'bb', 'ccc']);
});

test('sortedByLength keeps equal lengths in their original order', () => {
  assert.deepEqual(sortedByLength(['bb', 'aa', 'c']), ['c', 'bb', 'aa']);
});

test('sortedByLength leaves the original array alone', () => {
  const words = ['ccc', 'a'];
  sortedByLength(words);
  assert.deepEqual(words, ['ccc', 'a']);
});

test('sortedByAge puts the youngest person first', () => {
  assert.deepEqual(
    sortedByAge([
      { name: 'Ada', age: 36 },
      { name: 'Grace', age: 29 },
    ]),
    [
      { name: 'Grace', age: 29 },
      { name: 'Ada', age: 36 },
    ],
  );
});

test('sortedByAge sorts three people', () => {
  const people = [
    { name: 'Ada', age: 36 },
    { name: 'Alan', age: 41 },
    { name: 'Grace', age: 29 },
  ];
  assert.deepEqual(
    sortedByAge(people).map((person) => person.name),
    ['Grace', 'Ada', 'Alan'],
  );
});

test('sortedByAge leaves the original array alone', () => {
  const people = [
    { name: 'Ada', age: 36 },
    { name: 'Grace', age: 29 },
  ];
  sortedByAge(people);
  assert.equal(people[0].name, 'Ada');
});

test('sortedByAge returns an empty array for an empty array', () => {
  assert.deepEqual(sortedByAge([]), []);
});

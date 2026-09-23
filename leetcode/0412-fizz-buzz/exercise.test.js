import test from 'node:test';
import assert from 'node:assert/strict';
import { fizzBuzz } from './exercise.js';

test('fizzBuzz handles n = 3', () => {
  assert.deepEqual(fizzBuzz(3), ['1', '2', 'Fizz']);
});

test('fizzBuzz handles n = 5', () => {
  assert.deepEqual(fizzBuzz(5), ['1', '2', 'Fizz', '4', 'Buzz']);
});

test('fizzBuzz produces FizzBuzz at 15', () => {
  assert.equal(fizzBuzz(15)[14], 'FizzBuzz');
});

test('fizzBuzz returns numbers as strings', () => {
  assert.equal(typeof fizzBuzz(1)[0], 'string');
});

test('fizzBuzz starts at 1, not 0', () => {
  assert.deepEqual(fizzBuzz(1), ['1']);
});

test('fizzBuzz returns an empty array for 0', () => {
  assert.deepEqual(fizzBuzz(0), []);
});

test('fizzBuzz returns one entry per number', () => {
  assert.equal(fizzBuzz(15).length, 15);
});

test('fizzBuzz gets every entry right up to 15', () => {
  assert.deepEqual(fizzBuzz(15), [
    '1',
    '2',
    'Fizz',
    '4',
    'Buzz',
    'Fizz',
    '7',
    '8',
    'Fizz',
    'Buzz',
    '11',
    'Fizz',
    '13',
    '14',
    'FizzBuzz',
  ]);
});

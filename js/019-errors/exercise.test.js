import test from 'node:test';
import assert from 'node:assert/strict';
import { divide, checkAge, attempt } from './exercise.js';

test('divide divides two numbers', () => {
  assert.equal(divide(10, 2), 5);
});

test('divide keeps the decimal part', () => {
  assert.equal(divide(7, 2), 3.5);
});

test('divide throws when the divisor is zero', () => {
  assert.throws(() => divide(10, 0));
});

test('divide throws an error with the right message', () => {
  assert.throws(() => divide(10, 0), { message: 'cannot divide by zero' });
});

test('checkAge returns a valid age', () => {
  assert.equal(checkAge(30), 30);
});

test('checkAge accepts zero', () => {
  assert.equal(checkAge(0), 0);
});

test('checkAge throws a TypeError for a string', () => {
  assert.throws(() => checkAge('30'), TypeError);
});

test('checkAge gives the TypeError the right message', () => {
  assert.throws(() => checkAge('30'), { message: 'age must be a number' });
});

test('checkAge throws a TypeError for undefined', () => {
  assert.throws(() => checkAge(undefined), TypeError);
});

test('checkAge throws a RangeError for a negative number', () => {
  assert.throws(() => checkAge(-1), RangeError);
});

test('checkAge gives the RangeError the right message', () => {
  assert.throws(() => checkAge(-1), { message: 'age must be 0 or more' });
});

test('attempt returns the result when nothing goes wrong', () => {
  assert.equal(
    attempt(() => 1 + 1, 0),
    2,
  );
});

test('attempt returns the fallback when the function throws', () => {
  assert.equal(
    attempt(() => {
      throw new Error('x');
    }, 0),
    0,
  );
});

test('attempt catches a TypeError from inside the function', () => {
  assert.equal(
    attempt(() => undefined.name, 'safe'),
    'safe',
  );
});

test('attempt returns a falsy result rather than the fallback', () => {
  assert.equal(
    attempt(() => 0, 99),
    0,
  );
});

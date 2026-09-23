import test from 'node:test';
import assert from 'node:assert/strict';
import { sumTo, countVowels, reverse } from './exercise.js';

test('sumTo adds the numbers from 1 to 4', () => {
  assert.equal(sumTo(4), 10);
});

test('sumTo returns the number itself for 1', () => {
  assert.equal(sumTo(1), 1);
});

test('sumTo returns 0 for 0', () => {
  assert.equal(sumTo(0), 0);
});

test('sumTo handles a larger number', () => {
  assert.equal(sumTo(100), 5050);
});

test('countVowels counts repeated vowels', () => {
  assert.equal(countVowels('banana'), 3);
});

test('countVowels returns 0 when there are none', () => {
  assert.equal(countVowels('rhythm'), 0);
});

test('countVowels counts uppercase vowels too', () => {
  assert.equal(countVowels('AEIOU'), 5);
});

test('countVowels handles mixed case', () => {
  assert.equal(countVowels('EducAtion'), 5);
});

test('countVowels returns 0 for an empty string', () => {
  assert.equal(countVowels(''), 0);
});

test('reverse turns abc into cba', () => {
  assert.equal(reverse('abc'), 'cba');
});

test('reverse returns an empty string unchanged', () => {
  assert.equal(reverse(''), '');
});

test('reverse leaves a single character alone', () => {
  assert.equal(reverse('a'), 'a');
});

test('reverse handles spaces', () => {
  assert.equal(reverse('ab cd'), 'dc ba');
});

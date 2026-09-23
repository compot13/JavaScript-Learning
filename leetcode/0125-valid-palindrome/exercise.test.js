import test from 'node:test';
import assert from 'node:assert/strict';
import { isPalindrome } from './exercise.js';

test('isPalindrome accepts the canal example', () => {
  assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true);
});

test('isPalindrome rejects race a car', () => {
  assert.equal(isPalindrome('race a car'), false);
});

test('isPalindrome accepts a single space', () => {
  assert.equal(isPalindrome(' '), true);
});

test('isPalindrome accepts an empty string', () => {
  assert.equal(isPalindrome(''), true);
});

test('isPalindrome rejects 0P, so digits are not dropped', () => {
  assert.equal(isPalindrome('0P'), false);
});

test('isPalindrome accepts a palindrome of digits', () => {
  assert.equal(isPalindrome('12321'), true);
});

test('isPalindrome ignores case', () => {
  assert.equal(isPalindrome('Aa'), true);
});

test('isPalindrome accepts a single letter with punctuation', () => {
  assert.equal(isPalindrome('a.'), true);
});

test('isPalindrome rejects a near miss', () => {
  assert.equal(isPalindrome('abca'), false);
});

test('isPalindrome accepts an even length palindrome', () => {
  assert.equal(isPalindrome('abba'), true);
});

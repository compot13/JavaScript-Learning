import test from 'node:test';
import assert from 'node:assert/strict';
import { romanToInt } from './exercise.js';

test('romanToInt reads a repeated symbol', () => {
  assert.equal(romanToInt('III'), 3);
});

test('romanToInt reads a mixed numeral', () => {
  assert.equal(romanToInt('LVIII'), 58);
});

test('romanToInt handles three subtractions at once', () => {
  assert.equal(romanToInt('MCMXCIV'), 1994);
});

test('romanToInt handles a subtractive pair on its own', () => {
  assert.equal(romanToInt('IV'), 4);
});

test('romanToInt handles nine', () => {
  assert.equal(romanToInt('IX'), 9);
});

test('romanToInt handles a single symbol', () => {
  assert.equal(romanToInt('M'), 1000);
});

test('romanToInt handles forty', () => {
  assert.equal(romanToInt('XL'), 40);
});

test('romanToInt handles nine hundred', () => {
  assert.equal(romanToInt('CM'), 900);
});

test('romanToInt handles the largest valid numeral', () => {
  assert.equal(romanToInt('MMMCMXCIX'), 3999);
});

test('romanToInt handles a numeral ending in a subtractive pair', () => {
  assert.equal(romanToInt('XIV'), 14);
});

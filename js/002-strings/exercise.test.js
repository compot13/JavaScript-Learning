import test from 'node:test';
import assert from 'node:assert/strict';
import { greet, initials, titleCase } from './exercise.js';

test('greet puts the name into the greeting', () => {
  assert.equal(greet('Ada'), 'Hello, Ada!');
});

test('greet works with any name', () => {
  assert.equal(greet('Grace'), 'Hello, Grace!');
});

test('greet keeps the punctuation when the name is empty', () => {
  assert.equal(greet(''), 'Hello, !');
});

test('initials takes the first letter of each word', () => {
  assert.equal(initials('Ada Lovelace'), 'A.L');
});

test('initials uppercases a name written in lowercase', () => {
  assert.equal(initials('grace hopper'), 'G.H');
});

test('initials handles words of different lengths', () => {
  assert.equal(initials('Al Khwarizmi'), 'A.K');
});

test('titleCase uppercases the first letter', () => {
  assert.equal(titleCase('ada'), 'Ada');
});

test('titleCase lowercases the rest of the word', () => {
  assert.equal(titleCase('aDA'), 'Ada');
});

test('titleCase leaves an already correct word alone', () => {
  assert.equal(titleCase('Ada'), 'Ada');
});

test('titleCase returns an empty string for an empty string', () => {
  assert.equal(titleCase(''), '');
});

test('titleCase handles a single letter', () => {
  assert.equal(titleCase('a'), 'A');
});

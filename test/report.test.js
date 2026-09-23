import test from 'node:test';
import assert from 'node:assert/strict';
import { formatFailures } from '../src/report.js';

function failure(name, message) {
  return { name, message, file: 'exercise.test.js' };
}

test('an untouched exercise gets one message instead of a wall of them', () => {
  const output = formatFailures({
    passed: 0,
    failed: 3,
    failures: [
      failure('a', 'not implemented'),
      failure('b', 'not implemented'),
      failure('c', 'not implemented'),
    ],
  });

  assert.match(output, /still the ones the exercise shipped with/);
  assert.equal(output.match(/not implemented/g).length, 1);
});

test('real failures are shown with their test name and assertion', () => {
  const output = formatFailures({
    passed: 1,
    failed: 1,
    failures: [failure('returns 0 for an empty array', 'Expected values to be strictly equal:\n\n1 !== 0')],
  });

  assert.match(output, /Test: returns 0 for an empty array/);
  assert.match(output, /1 !== 0/);
});

test('only the first few failures are printed', () => {
  const failures = Array.from({ length: 7 }, (_, index) => failure(`test ${index}`, 'boom'));
  const output = formatFailures({ passed: 0, failed: 7, failures });

  assert.match(output, /Test: test 0/);
  assert.doesNotMatch(output, /Test: test 4/);
  assert.match(output, /and 4 more failing tests/);
});

test('a mix of real failures and untouched functions reports both', () => {
  const output = formatFailures({
    passed: 0,
    failed: 2,
    failures: [failure('a', 'Expected 1 to equal 2'), failure('b', 'not implemented')],
  });

  assert.match(output, /Test: a/);
  assert.match(output, /1 other test is still hitting "not implemented"/);
});

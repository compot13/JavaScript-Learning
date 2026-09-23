import test from 'node:test';
import assert from 'node:assert/strict';
import { parseArgs } from '../src/args.js';

test('reads the command out of the first argument', () => {
  assert.deepEqual(parseArgs(['today']), { command: 'today', args: [], flags: {} });
});

test('keeps positional arguments in order', () => {
  const { command, args } = parseArgs(['verify', 'js-001', 'js-002']);
  assert.equal(command, 'verify');
  assert.deepEqual(args, ['js-001', 'js-002']);
});

test('turns a bare flag into true', () => {
  assert.deepEqual(parseArgs(['hint', 'js-001', '--all']).flags, { all: true });
});

test('reads a flag with a value', () => {
  assert.deepEqual(parseArgs(['list', '--track=js']).flags, { track: 'js' });
});

test('returns an undefined command when nothing was typed', () => {
  assert.equal(parseArgs([]).command, undefined);
});

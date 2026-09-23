import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ROOT } from '../src/paths.js';

/** Run the CLI against a throwaway progress file and capture what it printed. */
function learn(args, { progressFile } = {}) {
  const file = progressFile ?? path.join(mkdtempSync(path.join(tmpdir(), 'learn-cli-')), 'progress.json');
  writeFileSync(file, '{ "version": 1, "items": {} }\n', { flag: 'wx' });
  return run(args, file);
}

function run(args, file) {
  try {
    const stdout = execFileSync(process.execPath, ['bin/learn.js', ...args], {
      cwd: ROOT,
      encoding: 'utf8',
      env: { ...process.env, LEARN_PROGRESS_FILE: file },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { code: 0, stdout, stderr: '', file };
  } catch (error) {
    return { code: error.status, stdout: error.stdout ?? '', stderr: error.stderr ?? '', file };
  }
}

function freshProgressFile() {
  const dir = mkdtempSync(path.join(tmpdir(), 'learn-cli-'));
  const file = path.join(dir, 'progress.json');
  writeFileSync(file, '{ "version": 1, "items": {} }\n');
  return { file, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

test('with no command it prints the usage and exits non-zero', () => {
  const result = learn([]);
  assert.notEqual(result.code, 0);
  assert.match(result.stdout, /Usage:\s+npm run learn/);
});

test('help exits cleanly', () => {
  const result = learn(['help']);
  assert.equal(result.code, 0);
  assert.match(result.stdout, /today/);
});

test('an unknown command says so and shows the usage', () => {
  const result = learn(['nope']);
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /There is no "nope" command/);
  assert.match(result.stderr, /Usage/);
});

test('list prints every JavaScript item with a status mark', () => {
  const result = learn(['list', 'js']);
  assert.equal(result.code, 0);
  const rows = result.stdout.split('\n').filter((line) => /^\s*\d+\. \[/.test(line));
  assert.equal(rows.length, 24);
});

test('list rejects a track that does not exist and names the real ones', () => {
  const result = learn(['list', 'nope']);
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /js, leetcode, basics/);
});

test('list needs a track', () => {
  assert.notEqual(learn(['list']).code, 0);
});

test('check with nothing open tells you to run today', () => {
  const result = learn(['check']);
  assert.equal(result.code, 0);
  assert.match(result.stdout, /Nothing is open/);
  assert.match(result.stdout, /npm run learn -- today/);
});

test('status starts at a zero streak', () => {
  const result = learn(['status']);
  assert.equal(result.code, 0);
  assert.match(result.stdout, /Streak\s+0 days/);
  assert.match(result.stdout, /js\s+\[/);
});

test('done refuses an exercise and points at check', () => {
  const result = learn(['done', 'js-001']);
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /finished by passing its tests/);
});

test('hint on an unknown id explains how to find the real ones', () => {
  const result = learn(['hint', 'not-an-item']);
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /Nothing matches/);
});

test('today deals the same items when it is run twice in one day', () => {
  const { file, cleanup } = freshProgressFile();
  try {
    const first = run(['today'], file);
    const second = run(['today'], file);

    const ids = (output) => output.stdout.match(/^\d+\. (\S+)/gm) ?? [];
    assert.deepEqual(ids(second), ids(first));
    if (ids(first).length > 0) {
      assert.match(second.stdout, /same items you were given earlier today/);
    }
  } finally {
    cleanup();
  }
});

test('today never leaves the learner without a next command', () => {
  const result = learn(['today']);
  assert.equal(result.code, 0);
  assert.match(result.stdout, /npm run learn --/);
});

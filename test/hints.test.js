import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { readHints } from '../src/hints.js';

function hintsFile(contents) {
  const file = path.join(mkdtempSync(path.join(tmpdir(), 'learn-hints-')), 'hints.md');
  writeFileSync(file, contents);
  return file;
}

test('splits a file into its three tiers', () => {
  const tiers = readHints(
    hintsFile('## Hint 1 - Language\n\nLook at slice.\n\n## Hint 2 - Nudge\n\nWhat is at index 0?\n\n## Hint 3 - Approach\n\nTake the first character.\n'),
  );

  assert.equal(tiers.length, 3);
  assert.equal(tiers[0].heading, 'Hint 1 - Language');
  assert.equal(tiers[0].body, 'Look at slice.');
  assert.equal(tiers[2].body, 'Take the first character.');
});

test('ignores sections that are not hints', () => {
  const tiers = readHints(
    hintsFile('## Hint 1 - Language\n\nOne.\n\n## Hint 2 - Nudge\n\nTwo.\n\n## Hint 3 - Approach\n\nThree.\n\n## Note\n\nSomething else.\n'),
  );

  assert.equal(tiers.length, 3);
});

test('returns nothing for a file that does not exist', () => {
  assert.deepEqual(readHints('/nowhere/hints.md'), []);
});

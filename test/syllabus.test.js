import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { loadSyllabus, resolveItem, resolveTrack, trackItems } from '../src/syllabus.js';
import { fromRoot } from '../src/paths.js';

const syllabus = loadSyllabus();

test('loads all three tracks', () => {
  assert.equal(trackItems(syllabus, 'js').length, 24);
  assert.equal(trackItems(syllabus, 'leetcode').length, 27);
  assert.equal(trackItems(syllabus, 'basics').length, 6);
});

test('every item id is unique', () => {
  const ids = syllabus.items.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every folder path is unique', () => {
  const folders = syllabus.items.map((item) => item.folder);
  assert.equal(new Set(folders).size, folders.length);
});

test('every required item exists and comes earlier in the course', () => {
  const position = new Map(syllabus.items.map((item, index) => [item.id, index]));
  for (const item of syllabus.items) {
    for (const required of item.requires ?? []) {
      assert.ok(position.has(required), `${item.id} requires unknown item ${required}`);
    }
  }
  for (const item of trackItems(syllabus, 'js')) {
    for (const required of item.requires ?? []) {
      const earlier = syllabus.items.find((other) => other.id === required);
      assert.ok(earlier.order < item.order, `${item.id} requires the later item ${required}`);
    }
  }
});

test('every basics article names a JavaScript item it is due before', () => {
  for (const item of trackItems(syllabus, 'basics')) {
    const gate = syllabus.items.find((other) => other.id === item.dueBefore);
    assert.ok(gate, `${item.id} points at unknown item ${item.dueBefore}`);
  }
});

test('an item marked authored has its files on disk', () => {
  for (const item of syllabus.items.filter((entry) => entry.authored)) {
    const files =
      item.kind === 'article'
        ? [item.folder]
        : ['README.md', 'exercise.js', 'exercise.test.js', 'solution.js', 'hints.md'].map(
            (name) => `${item.folder}/${name}`,
          );
    for (const file of files) {
      assert.ok(existsSync(fromRoot(file)), `${item.id} is authored but ${file} is missing`);
    }
  }
});

test('resolves an id written the long way', () => {
  assert.equal(resolveItem(syllabus, 'js-001').item.id, 'js-001');
});

test('resolves a bare number to the JavaScript track', () => {
  assert.equal(resolveItem(syllabus, '3').item.id, 'js-003');
  assert.equal(resolveItem(syllabus, '003').item.id, 'js-003');
});

test('resolves a LeetCode problem number with or without padding', () => {
  assert.equal(resolveItem(syllabus, 'lc-1').item.id, 'lc-0001');
  assert.equal(resolveItem(syllabus, 'lc-0001').item.id, 'lc-0001');
  assert.equal(resolveItem(syllabus, '1480').item.id, 'lc-1480');
});

test('resolves a slug fragment', () => {
  assert.equal(resolveItem(syllabus, 'two-sum').item.id, 'lc-0001');
});

test('reports an ambiguous fragment instead of guessing', () => {
  const result = resolveItem(syllabus, 'array');
  assert.equal(result.item, undefined);
  assert.match(result.error, /matches more than one item/);
});

test('reports an unknown id with advice', () => {
  const result = resolveItem(syllabus, 'nonsense-xyz');
  assert.match(result.error, /Nothing matches/);
  assert.match(result.error, /list js/);
});

test('accepts track aliases', () => {
  assert.equal(resolveTrack('lc'), 'leetcode');
  assert.equal(resolveTrack('JavaScript'), 'js');
  assert.equal(resolveTrack('nope'), null);
});

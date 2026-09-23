import { readFileSync, writeFileSync } from 'node:fs';
import { fromRoot } from './paths.js';

export const TRACKS = ['js', 'leetcode', 'basics'];

const TRACK_ALIASES = {
  js: 'js',
  javascript: 'js',
  leetcode: 'leetcode',
  lc: 'leetcode',
  basics: 'basics',
  reading: 'basics',
};

function file(track) {
  return fromRoot('syllabus', `${track}.json`);
}

/**
 * Load all three syllabus files.
 * Returns { tracks: { js: {...}, ... }, items: [...] } where every item carries
 * its track name and its position in that track's order.
 */
export function loadSyllabus() {
  const tracks = {};
  const items = [];

  for (const track of TRACKS) {
    const data = JSON.parse(readFileSync(file(track), 'utf8'));
    data.items.forEach((item, index) => {
      item.track = track;
      item.order = index;
      item.kind = track === 'basics' ? 'article' : 'exercise';
      items.push(item);
    });
    tracks[track] = data;
  }

  return { tracks, items };
}

/** Write one track's syllabus back, preserving key order and formatting. */
export function saveTrack(track, data) {
  const copy = {
    ...data,
    items: data.items.map(({ track: _t, order: _o, kind: _k, ...rest }) => rest),
  };
  writeFileSync(file(track), `${JSON.stringify(copy, null, 2)}\n`);
}

/** Normalise "lc", "javascript", "LeetCode" to a track name, or null. */
export function resolveTrack(input) {
  if (!input) return null;
  return TRACK_ALIASES[String(input).toLowerCase()] ?? null;
}

/**
 * Find one item from whatever the learner typed:
 *   js-001 | 001 | 1 | lc-1480 | 1480 | two-sum | variables
 * Returns { item } or { error } with a message worth printing as-is.
 */
export function resolveItem(syllabus, input) {
  if (!input) {
    return { error: 'Which item? Example: npm run learn -- hint js-001' };
  }

  const raw = String(input).trim();
  const lower = raw.toLowerCase();

  const exact = syllabus.items.find((item) => item.id.toLowerCase() === lower);
  if (exact) return { item: exact };

  // "1480" or "0001" with no prefix: try the JS track first, then LeetCode.
  if (/^\d+$/.test(lower)) {
    const padded = lower.padStart(3, '0');
    const jsItem = syllabus.items.find((item) => item.id === `js-${padded}`);
    if (jsItem) return { item: jsItem };
    const lcItem = syllabus.items.find(
      (item) => item.track === 'leetcode' && item.number === Number(lower),
    );
    if (lcItem) return { item: lcItem };
  }

  // "lc-1", "lc-0001": match on the LeetCode problem number.
  const lcMatch = lower.match(/^lc-0*(\d+)$/);
  if (lcMatch) {
    const byNumber = syllabus.items.find(
      (item) => item.track === 'leetcode' && item.number === Number(lcMatch[1]),
    );
    if (byNumber) return { item: byNumber };
  }

  const matches = syllabus.items.filter(
    (item) =>
      item.folder.toLowerCase().includes(lower) || item.title.toLowerCase().includes(lower),
  );
  if (matches.length === 1) return { item: matches[0] };
  if (matches.length > 1) {
    const list = matches.map((item) => `  ${item.id}  ${item.title}`).join('\n');
    return { error: `"${raw}" matches more than one item:\n${list}` };
  }

  return {
    error: `Nothing matches "${raw}".\nRun "npm run learn -- list js" to see every item and its id.`,
  };
}

/** Every item of a track, in course order. */
export function trackItems(syllabus, track) {
  return syllabus.items.filter((item) => item.track === track);
}

export function itemById(syllabus, id) {
  return syllabus.items.find((item) => item.id === id) ?? null;
}

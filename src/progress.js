import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fromRoot } from './paths.js';

// The tests for the CLI point this at a throwaway file so they never touch the
// learner's real record.
const FILE = process.env.LEARN_PROGRESS_FILE
  ? path.resolve(process.env.LEARN_PROGRESS_FILE)
  : fromRoot('progress.json');
const EMPTY = { version: 1, items: {} };

export const OPEN = 'open';
export const DONE = 'done';
export const SOLVED_WITH_HELP = 'solved_with_help';

/** A local calendar date as YYYY-MM-DD. Local, not UTC: "today" means the learner's today. */
export function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadProgress() {
  if (!existsSync(FILE)) return structuredClone(EMPTY);
  try {
    const parsed = JSON.parse(readFileSync(FILE, 'utf8'));
    return { ...structuredClone(EMPTY), ...parsed, items: parsed.items ?? {} };
  } catch {
    // A corrupt file should not end the learner's day. Start clean and say so.
    console.error('progress.json could not be read, so progress is starting from empty.');
    return structuredClone(EMPTY);
  }
}

export function saveProgress(progress) {
  writeFileSync(FILE, `${JSON.stringify(progress, null, 2)}\n`);
}

export function entryFor(progress, id) {
  return progress.items[id] ?? null;
}

export function statusOf(progress, id) {
  return progress.items[id]?.status ?? null;
}

export function isFinished(progress, id) {
  const status = statusOf(progress, id);
  return status === DONE || status === SOLVED_WITH_HELP;
}

export function isOpen(progress, id) {
  return statusOf(progress, id) === OPEN;
}

/** Every item currently open, oldest first. */
export function openIds(progress) {
  return Object.entries(progress.items)
    .filter(([, entry]) => entry.status === OPEN)
    .sort((a, b) => String(a[1].startedAt).localeCompare(String(b[1].startedAt)))
    .map(([id]) => id);
}

export function deal(progress, id, now = new Date()) {
  const existing = progress.items[id] ?? {};
  progress.items[id] = {
    hintsRevealed: 0,
    nextHint: 0,
    ...existing,
    status: existing.status && existing.status !== OPEN ? existing.status : OPEN,
    dealtOn: dateKey(now),
    startedAt: existing.startedAt ?? now.toISOString(),
  };
  return progress.items[id];
}

export function finish(progress, id, status, now = new Date()) {
  const existing = progress.items[id] ?? { hintsRevealed: 0, nextHint: 0 };
  progress.items[id] = {
    ...existing,
    status,
    dealtOn: existing.dealtOn ?? dateKey(now),
    startedAt: existing.startedAt ?? now.toISOString(),
    completedAt: now.toISOString(),
  };
  return progress.items[id];
}

/** Ids dealt on a given calendar day, in the order they were dealt. */
export function dealtOn(progress, day) {
  return Object.entries(progress.items)
    .filter(([, entry]) => entry.dealtOn === day)
    .sort((a, b) => String(a[1].startedAt).localeCompare(String(b[1].startedAt)))
    .map(([id]) => id);
}

/** Ids finished on a given calendar day. */
export function finishedOn(progress, day) {
  return Object.entries(progress.items)
    .filter(([, entry]) => entry.completedAt && dateKey(new Date(entry.completedAt)) === day)
    .map(([id]) => id);
}

/**
 * Consecutive days with at least one finished item, counting back from today.
 * Derived from timestamps every time, so it cannot drift out of step with the record.
 */
export function streak(progress, now = new Date()) {
  const days = new Set(
    Object.values(progress.items)
      .filter((entry) => entry.completedAt)
      .map((entry) => dateKey(new Date(entry.completedAt))),
  );
  if (days.size === 0) return 0;

  const cursor = new Date(now);
  // A day that is still in progress should not break yesterday's streak.
  if (!days.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  if (!days.has(dateKey(cursor))) return 0;

  let count = 0;
  while (days.has(dateKey(cursor))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

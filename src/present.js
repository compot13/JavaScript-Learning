import path from 'node:path';
import { fromRoot } from './paths.js';
import { statusOf, DONE, SOLVED_WITH_HELP, OPEN } from './progress.js';

const STATUS_LABEL = {
  [DONE]: 'done',
  [SOLVED_WITH_HELP]: 'done (used the solution)',
  [OPEN]: 'open',
};

export function statusLabel(progress, id) {
  return STATUS_LABEL[statusOf(progress, id)] ?? 'not started';
}

export function statusMark(progress, id) {
  const status = statusOf(progress, id);
  if (status === DONE) return '[x]';
  if (status === SOLVED_WITH_HELP) return '[~]';
  if (status === OPEN) return '[>]';
  return '[ ]';
}

export function itemPaths(item) {
  if (item.kind === 'article') {
    return { readme: item.folder, folder: path.dirname(item.folder) };
  }
  return {
    folder: item.folder,
    readme: `${item.folder}/README.md`,
    exercise: `${item.folder}/exercise.js`,
    test: `${item.folder}/exercise.test.js`,
    solution: `${item.folder}/solution.js`,
    hints: `${item.folder}/hints.md`,
  };
}

export function absolutePaths(item) {
  const relativePaths = itemPaths(item);
  return Object.fromEntries(
    Object.entries(relativePaths).map(([key, value]) => [key, fromRoot(value)]),
  );
}

/** The block of text printed for one item by `today`. */
export function itemCard(item, index) {
  const paths = itemPaths(item);
  const lines = [`${index}. ${item.id}  ${item.title}`];

  if (item.track === 'leetcode' && item.url) {
    lines.push(`   Problem  LeetCode ${item.number} - ${item.url}`);
  }
  lines.push(`   Teaches  ${item.teaches}`);
  lines.push(`   Read     ${paths.readme}`);

  if (item.kind === 'article') {
    lines.push(`   Finish   npm run learn -- done ${item.id}`);
  } else {
    lines.push(`   Edit     ${paths.exercise}`);
    lines.push(`   Test     npm run test -- ${item.id}`);
    lines.push(`   Stuck    npm run learn -- hint ${item.id}`);
  }
  return lines.join('\n');
}

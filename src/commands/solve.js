import { existsSync, readFileSync } from 'node:fs';
import { loadProgress, saveProgress, finish, SOLVED_WITH_HELP, isFinished } from '../progress.js';
import { loadSyllabus, resolveItem } from '../syllabus.js';
import { absolutePaths } from '../present.js';
import { heading } from '../render.js';

export function solve(args) {
  const syllabus = loadSyllabus();
  const progress = loadProgress();

  const { item, error } = resolveItem(syllabus, args[0]);
  if (error) {
    console.error(error);
    return 1;
  }

  if (item.kind === 'article') {
    console.error(`${item.id} is an article. There is no solution to show.`);
    return 1;
  }

  const file = absolutePaths(item).solution;
  if (!existsSync(file)) {
    console.error(`${item.id} has no solution file yet.`);
    return 1;
  }

  console.log(heading(`Solution for ${item.id}  ${item.title}`));
  console.log(`\n${item.folder}/solution.js\n`);
  console.log(readFileSync(file, 'utf8'));

  if (!isFinished(progress, item.id)) {
    finish(progress, item.id, SOLVED_WITH_HELP);
    saveProgress(progress);
    console.log('Recorded as solved with help, so your record stays honest.');
  }

  console.log('Type it out yourself rather than pasting it, then run:');
  console.log(`  npm run test -- ${item.id}`);
  return 0;
}

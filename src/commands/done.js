import { loadProgress, saveProgress, isFinished, finish, DONE } from '../progress.js';
import { loadSyllabus, resolveItem } from '../syllabus.js';

export function done(args) {
  const syllabus = loadSyllabus();
  const progress = loadProgress();

  const { item, error } = resolveItem(syllabus, args[0]);
  if (error) {
    console.error(error);
    return 1;
  }

  if (item.kind !== 'article') {
    console.error(`${item.id} is an exercise, so it is finished by passing its tests.`);
    console.error(`Run:  npm run learn -- check`);
    return 1;
  }

  if (isFinished(progress, item.id)) {
    console.log(`${item.id} is already marked done.`);
    return 0;
  }

  finish(progress, item.id, DONE);
  saveProgress(progress);
  console.log(`Marked done: ${item.id}  ${item.title}`);
  console.log('Run "npm run learn -- check" when your exercises are passing too.');
  return 0;
}

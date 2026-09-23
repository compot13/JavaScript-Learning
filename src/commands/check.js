import { loadProgress, saveProgress, openIds, finish, DONE } from '../progress.js';
import { loadSyllabus, itemById, resolveItem } from '../syllabus.js';
import { absolutePaths } from '../present.js';
import { runTests, testFiles } from '../runner.js';
import { heading } from '../render.js';
import { formatFailures } from '../report.js';

export async function check(args) {
  const syllabus = loadSyllabus();
  const progress = loadProgress();

  let items;
  if (args[0]) {
    const { item, error } = resolveItem(syllabus, args[0]);
    if (error) {
      console.error(error);
      return 1;
    }
    items = [item];
  } else {
    items = openIds(progress).map((id) => itemById(syllabus, id)).filter(Boolean);
  }

  if (items.length === 0) {
    console.log('Nothing is open, so there is nothing to check.');
    console.log('Run "npm run learn -- today" to get today\'s work.');
    return 0;
  }

  console.log(heading('Checking your work'));

  let allPassing = true;

  for (const item of items) {
    console.log(`\n${item.id}  ${item.title}`);

    if (item.kind === 'article') {
      console.log('  This one is reading, not code. There is nothing to run.');
      console.log(`  Finish it with:  npm run learn -- done ${item.id}`);
      allPassing = false;
      continue;
    }

    const files = testFiles(absolutePaths(item).folder);
    if (files.length === 0) {
      console.log('  No test file found. This item is not written yet.');
      allPassing = false;
      continue;
    }

    const result = await runTests(files);

    if (result.failed === 0 && result.passed > 0) {
      finish(progress, item.id, DONE);
      console.log(`  PASSED  ${result.passed} test${result.passed === 1 ? '' : 's'}. Marked done.`);
      continue;
    }

    allPassing = false;
    console.log(`  FAILED  ${result.failed} of ${result.failed + result.passed} tests.`);
    console.log(formatFailures(result));
    console.log(`\n  Open ${item.folder}/exercise.js and try again.`);
    console.log(`  Run only this one with:   npm run test -- ${item.id}`);
    console.log(`  Stuck? npm run learn -- hint ${item.id}`);
  }

  saveProgress(progress);

  console.log();
  if (allPassing) {
    console.log('Everything open is passing. Run "npm run learn -- today" tomorrow for the next items.');
    console.log('Or "npm run learn -- status" to see your streak.');
  }
  return allPassing ? 0 : 1;
}

import { loadSyllabus, resolveItem } from '../syllabus.js';
import { absolutePaths } from '../present.js';
import { runTests, testFiles } from '../runner.js';
import { heading } from '../render.js';
import { formatFailures } from '../report.js';

/** Run one item's tests without touching progress. The fast inner loop. */
export async function test(args) {
  const syllabus = loadSyllabus();

  let items;
  if (args[0]) {
    const { item, error } = resolveItem(syllabus, args[0]);
    if (error) {
      console.error(error);
      return 1;
    }
    items = [item];
  } else {
    items = syllabus.items.filter((item) => item.kind === 'exercise' && item.authored);
    if (items.length === 0) {
      console.error('No exercises are written yet.');
      return 1;
    }
  }

  let failed = 0;
  let passed = 0;

  for (const item of items) {
    if (item.kind === 'article') {
      console.error(`${item.id} is an article. There are no tests to run.`);
      return 1;
    }

    const files = testFiles(absolutePaths(item).folder);
    if (files.length === 0) {
      console.error(`No tests found for ${item.id}. Expected ${item.folder}/exercise.test.js`);
      return 1;
    }

    const result = await runTests(files);
    passed += result.passed;
    failed += result.failed;

    if (items.length === 1) {
      console.log(heading(`${item.id}  ${item.title}`));
      console.log();
    }

    if (result.failed === 0) {
      console.log(`PASS  ${item.id}  ${result.passed} test${result.passed === 1 ? '' : 's'}`);
    } else {
      console.log(`FAIL  ${item.id}  ${result.failed} failing, ${result.passed} passing`);
      console.log(formatFailures(result));
      console.log();
    }
  }

  if (failed === 0) {
    console.log('\nAll green. Record it with:  npm run learn -- check');
    return 0;
  }
  console.log(`\n${failed} test${failed === 1 ? '' : 's'} still failing.`);
  if (items.length === 1) {
    console.log(`Edit ${items[0].folder}/exercise.js, then run this command again.`);
    console.log(`Stuck? npm run learn -- hint ${items[0].id}`);
  }
  return 1;
}

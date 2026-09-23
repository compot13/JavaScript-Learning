import { loadSyllabus, resolveItem, saveTrack } from '../syllabus.js';
import { verifyArticle, verifyExercise } from '../verify.js';
import { heading } from '../render.js';
import { existsSync } from 'node:fs';
import { fromRoot } from '../paths.js';

/**
 * Author-side check. Content only gets "authored": true once its five files
 * exist, its tests fail against the stub, and they pass against the solution.
 */
export async function verify(args, flags) {
  const syllabus = loadSyllabus();

  let items;
  if (args.length > 0) {
    items = [];
    for (const arg of args) {
      const { item, error } = resolveItem(syllabus, arg);
      if (error) {
        console.error(error);
        return 1;
      }
      items.push(item);
    }
  } else {
    // Everything that has files on disk, authored or not.
    items = syllabus.items.filter((item) =>
      existsSync(fromRoot(item.kind === 'article' ? item.folder : `${item.folder}/README.md`)),
    );
  }

  if (items.length === 0) {
    console.log('No content found to verify yet.');
    return 0;
  }

  console.log(heading(`Verifying ${items.length} item(s)`));
  console.log();

  const changed = new Set();
  let failures = 0;

  for (const item of items) {
    const result =
      item.kind === 'article' ? verifyArticle(item) : await verifyExercise(item);

    if (result.ok) {
      const count = result.tests ? `  ${result.tests} tests` : '';
      console.log(`PASS  ${item.id}${count}`);
      if (!item.authored && !flags['no-write']) {
        item.authored = true;
        changed.add(item.track);
      }
    } else {
      failures += 1;
      console.log(`${result.skipped ? 'SKIP' : 'FAIL'}  ${item.id}`);
      for (const problem of result.problems) console.log(`        ${problem}`);
      if (item.authored && !flags['no-write']) {
        item.authored = false;
        changed.add(item.track);
      }
    }
  }

  for (const track of changed) {
    saveTrack(track, syllabus.tracks[track]);
    console.log(`\nUpdated syllabus/${track}.json`);
  }

  console.log(failures === 0 ? '\nAll verified.' : `\n${failures} item(s) not shippable.`);
  return failures === 0 ? 0 : 1;
}

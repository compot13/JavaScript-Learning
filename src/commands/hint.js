import { existsSync } from 'node:fs';
import { loadProgress, saveProgress, deal } from '../progress.js';
import { loadSyllabus, resolveItem } from '../syllabus.js';
import { absolutePaths } from '../present.js';
import { readHints } from '../hints.js';
import { heading } from '../render.js';

export function hint(args, flags) {
  const syllabus = loadSyllabus();
  const progress = loadProgress();

  const { item, error } = resolveItem(syllabus, args[0]);
  if (error) {
    console.error(error);
    return 1;
  }

  if (item.kind === 'article') {
    console.error(`${item.id} is an article, so it has no hints. Read it and run:`);
    console.error(`  npm run learn -- done ${item.id}`);
    return 1;
  }

  const file = absolutePaths(item).hints;
  if (!existsSync(file)) {
    console.error(`${item.id} has no hints file yet.`);
    return 1;
  }

  const tiers = readHints(file);
  const entry = progress.items[item.id] ?? deal(progress, item.id);

  if (flags.reset) {
    entry.nextHint = 0;
    saveProgress(progress);
    console.log(`Hints for ${item.id} start from the beginning again.`);
    console.log(`You have revealed ${entry.hintsRevealed} hint(s) in total; that count stays.`);
    return 0;
  }

  if (flags.all) {
    console.log(heading(`All hints for ${item.id}`));
    for (const tier of tiers) {
      console.log(`\n${tier.heading}\n\n${tier.body}`);
    }
    entry.hintsRevealed += tiers.length - entry.nextHint > 0 ? tiers.length - entry.nextHint : 0;
    entry.nextHint = tiers.length;
    saveProgress(progress);
    return 0;
  }

  if (entry.nextHint >= tiers.length) {
    console.log(`That is every hint for ${item.id}.`);
    console.log('To see them again:      npm run learn -- hint ' + item.id + ' --reset');
    console.log('To see the answer:      npm run learn -- solve ' + item.id);
    return 0;
  }

  const tier = tiers[entry.nextHint];
  entry.nextHint += 1;
  entry.hintsRevealed += 1;
  saveProgress(progress);

  console.log(heading(`${item.id}  hint ${entry.nextHint} of ${tiers.length}`));
  console.log(`\n${tier.heading}\n\n${tier.body}\n`);

  if (entry.nextHint < tiers.length) {
    console.log(`Need more? Run the same command again for hint ${entry.nextHint + 1}.`);
  } else {
    console.log(`That was the last hint. The answer is in: npm run learn -- solve ${item.id}`);
  }
  return 0;
}

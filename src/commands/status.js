import { loadProgress, streak, dateKey, finishedOn, isFinished, statusOf, SOLVED_WITH_HELP, OPEN } from '../progress.js';
import { loadSyllabus, trackItems, TRACKS } from '../syllabus.js';
import { bar, heading } from '../render.js';

export function status() {
  const syllabus = loadSyllabus();
  const progress = loadProgress();
  const today = dateKey();

  console.log(heading('Status'));

  const days = streak(progress);
  const finishedToday = finishedOn(progress, today);

  console.log(`\nStreak           ${days} day${days === 1 ? '' : 's'} in a row`);
  console.log(`Finished today   ${finishedToday.length}${finishedToday.length ? ` (${finishedToday.join(', ')})` : ''}`);

  console.log('\nProgress');
  for (const track of TRACKS) {
    const items = trackItems(syllabus, track);
    const done = items.filter((item) => isFinished(progress, item.id)).length;
    const withHelp = items.filter((item) => statusOf(progress, item.id) === SOLVED_WITH_HELP).length;
    const label = track.padEnd(9);
    const extra = withHelp ? `  (${withHelp} with the solution)` : '';
    console.log(`  ${label} ${bar(done, items.length)}${extra}`);
  }

  const open = syllabus.items.filter((item) => statusOf(progress, item.id) === OPEN);
  if (open.length > 0) {
    console.log('\nStill open');
    for (const item of open) console.log(`  ${item.id}  ${item.title}`);
    console.log('\nRun "npm run learn -- check" when you have had a go at them.');
  } else {
    console.log('\nNothing is open. Run "npm run learn -- today" for the next items.');
  }
  return 0;
}

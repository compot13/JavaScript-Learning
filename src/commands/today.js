import { loadProgress, saveProgress, dateKey } from '../progress.js';
import { loadSyllabus } from '../syllabus.js';
import { itemsForToday } from '../scheduler.js';
import { itemCard } from '../present.js';
import { heading } from '../render.js';

const DAY_FORMAT = { weekday: 'long', day: 'numeric', month: 'long' };

const TRACK_NAME = { js: 'JavaScript', leetcode: 'LeetCode', basics: 'reading' };

/** Say in one sentence why a track has nothing for the learner today. */
function explain(note) {
  const track = TRACK_NAME[note.track] ?? note.track;
  if (note.reason === 'finished') return `No ${track} item today: you have finished that track.`;
  if (note.reason === 'unwritten') {
    return `No ${track} item today: "${note.item.title}" is not written yet.`;
  }
  return `No ${track} item today: "${note.item.title}" needs ${note.missing.join(', ')} finished first.`;
}

export function today() {
  const syllabus = loadSyllabus();
  const progress = loadProgress();
  const now = new Date();

  const { items, fresh, notes } = itemsForToday(syllabus, progress, now);
  if (fresh) saveProgress(progress);

  console.log(heading(`Today - ${now.toLocaleDateString(undefined, DAY_FORMAT)}`));

  if (items.length === 0) {
    console.log('\nThere is nothing to deal today.');
    for (const note of notes) console.log(`  ${explain(note)}`);
    console.log('\nRun "npm run learn -- status" to see the whole record.');
    return 0;
  }

  console.log();
  items.forEach((item, index) => {
    console.log(itemCard(item, index + 1));
    console.log();
  });

  if (!fresh) {
    console.log('These are the same items you were given earlier today.');
  }
  for (const note of notes) console.log(explain(note));
  if (notes.length > 0) console.log();

  console.log('When you think you are finished, run:  npm run learn -- check');
  console.log(`(Dealt on ${dateKey(now)}.)`);
  return 0;
}

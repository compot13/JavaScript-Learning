import { loadProgress } from '../progress.js';
import { loadSyllabus, resolveTrack, trackItems, TRACKS } from '../syllabus.js';
import { statusMark, statusLabel } from '../present.js';
import { heading } from '../render.js';

export function list(args) {
  const syllabus = loadSyllabus();
  const progress = loadProgress();

  const track = resolveTrack(args[0]);
  if (!track) {
    console.error(`Which track? One of: ${TRACKS.join(', ')}`);
    console.error('Example:  npm run learn -- list js');
    return 1;
  }

  const items = trackItems(syllabus, track);
  console.log(heading(`${syllabus.tracks[track].title} - ${items.length} items`));
  console.log('\n[x] done   [~] done with the solution   [>] open   [ ] not started\n');

  items.forEach((item, index) => {
    const number = String(index + 1).padStart(2, ' ');
    const written = item.authored ? '' : '   (not written yet)';
    console.log(`${number}. ${statusMark(progress, item.id)} ${item.id.padEnd(8)} ${item.title}${written}`);
  });

  const nextUp = items.find((item) => statusLabel(progress, item.id) === 'not started');
  if (nextUp) console.log(`\nNext in this track: ${nextUp.id}`);
  return 0;
}

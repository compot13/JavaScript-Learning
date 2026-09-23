import { dateKey, dealtOn, deal, isFinished, openIds } from './progress.js';
import { itemById, trackItems } from './syllabus.js';

/**
 * The next item of a track the learner is allowed to start.
 * Walks the track in course order and returns the first item that is unfinished
 * and whose required items are all finished.
 *
 * Returns one of:
 *   { item }                      ready to work on
 *   { blocked }                   the next item in order is not written yet
 *   { waiting, missing }          every unfinished item needs a lesson first
 *   {}                            the track is finished
 */
export function nextEligible(syllabus, progress, track) {
  let waiting = null;
  let missing = [];

  for (const item of trackItems(syllabus, track)) {
    if (isFinished(progress, item.id)) continue;

    const unmet = (item.requires ?? []).filter((id) => !isFinished(progress, id));
    if (unmet.length > 0) {
      if (!waiting) {
        waiting = item;
        missing = unmet;
      }
      continue;
    }

    if (!item.authored) return { blocked: item };
    return { item };
  }

  return waiting ? { waiting, missing } : {};
}

/** The next background article, if the curriculum has reached the point it is due. */
export function nextArticle(syllabus, progress, jsItem) {
  for (const item of trackItems(syllabus, 'basics')) {
    if (isFinished(progress, item.id)) continue;
    if (!item.authored) return null;

    const gate = itemById(syllabus, item.dueBefore);
    const reached =
      !gate || isFinished(progress, gate.id) || (jsItem ? jsItem.order >= gate.order : true);
    return reached ? item : null;
  }
  return null;
}

/**
 * What the learner works on today.
 * Idempotent for the calendar day: once items are dealt, the same ones come
 * back. A new day carries over anything still open before dealing new work.
 */
export function itemsForToday(syllabus, progress, now = new Date()) {
  const day = dateKey(now);
  const alreadyDealt = dealtOn(progress, day);

  if (alreadyDealt.length > 0) {
    return {
      fresh: false,
      items: alreadyDealt.map((id) => itemById(syllabus, id)).filter(Boolean),
      notes: [],
    };
  }

  const open = openIds(progress).map((id) => itemById(syllabus, id)).filter(Boolean);
  const chosen = [];
  const notes = [];

  for (const track of ['js', 'leetcode']) {
    const carried = open.find((item) => item.track === track);
    if (carried) {
      chosen.push(carried);
      continue;
    }

    const result = nextEligible(syllabus, progress, track);
    if (result.item) chosen.push(result.item);
    else if (result.blocked) notes.push({ track, reason: 'unwritten', item: result.blocked });
    else if (result.waiting) {
      notes.push({ track, reason: 'waiting', item: result.waiting, missing: result.missing });
    } else notes.push({ track, reason: 'finished' });
  }

  const carriedArticle = open.find((item) => item.track === 'basics');
  const article =
    carriedArticle ?? nextArticle(syllabus, progress, chosen.find((item) => item.track === 'js'));
  if (article) chosen.push(article);

  for (const item of chosen) deal(progress, item.id, now);

  return { fresh: true, items: chosen, notes };
}

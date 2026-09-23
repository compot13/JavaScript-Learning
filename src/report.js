import { indent } from './render.js';

const NOT_IMPLEMENTED = 'not implemented';
const DEFAULT_LIMIT = 3;

/**
 * Turn a test result into something a beginner can act on.
 * A wall of identical "not implemented" errors is one message, not twenty, and
 * real failures are capped so the first one stays on screen.
 */
export function formatFailures(result, { limit = DEFAULT_LIMIT } = {}) {
  const lines = [];
  const untouched = result.failures.filter((failure) => failure.message.trim() === NOT_IMPLEMENTED);

  if (untouched.length === result.failures.length && untouched.length > 0) {
    lines.push('  Every test failed with "not implemented", so the functions are');
    lines.push('  still the ones the exercise shipped with. Replace the throw lines');
    lines.push('  with your own code.');
    return lines.join('\n');
  }

  const real = result.failures.filter((failure) => failure.message.trim() !== NOT_IMPLEMENTED);
  const shown = real.slice(0, limit);

  for (const failure of shown) {
    lines.push(`\n  Test: ${failure.name}`);
    lines.push(indent(failure.message, '    '));
  }

  const hidden = real.length - shown.length;
  if (hidden > 0) {
    lines.push(`\n  ...and ${hidden} more failing test${hidden === 1 ? '' : 's'}.`);
  }
  if (untouched.length > 0) {
    lines.push(
      `\n  ${untouched.length} other test${untouched.length === 1 ? ' is' : 's are'} still hitting "not implemented".`,
    );
  }
  return lines.join('\n');
}

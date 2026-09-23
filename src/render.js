/** Plain-text output helpers. Nothing here knows about progress or the syllabus. */

export function rule(width = 60) {
  return '-'.repeat(width);
}

export function heading(text) {
  return `\n${text}\n${rule(Math.max(text.length, 20))}`;
}

/** A progress bar like [#####-----] 5/10 */
export function bar(done, total, width = 20) {
  const safeTotal = Math.max(total, 1);
  const filled = Math.round((done / safeTotal) * width);
  return `[${'#'.repeat(filled)}${'-'.repeat(width - filled)}] ${done}/${total}`;
}

/** Wrap prose to a readable width without breaking words. */
export function wrap(text, width = 76) {
  const out = [];
  for (const paragraph of text.split('\n')) {
    let line = '';
    for (const word of paragraph.split(' ')) {
      if (line && `${line} ${word}`.length > width) {
        out.push(line);
        line = word;
      } else {
        line = line ? `${line} ${word}` : word;
      }
    }
    out.push(line);
  }
  return out.join('\n');
}

export function indent(text, prefix = '  ') {
  return text
    .split('\n')
    .map((line) => (line ? prefix + line : line))
    .join('\n');
}

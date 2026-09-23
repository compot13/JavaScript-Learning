import { existsSync, readFileSync } from 'node:fs';

/**
 * Split hints.md into its tiers. A tier is a "## " section whose heading
 * starts with the word Hint, so a file can carry other sections without the
 * CLI handing them out as extra hints.
 * Returns [{ heading, body }, ...] in file order.
 */
export function readHints(file) {
  if (!existsSync(file)) return [];

  const text = readFileSync(file, 'utf8');
  const tiers = [];
  let current = null;

  for (const line of text.split('\n')) {
    const heading = line.match(/^##\s+(.*)$/);
    if (heading) {
      if (current) tiers.push(current);
      current = { heading: heading[1].trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) tiers.push(current);

  return tiers
    .filter((tier) => /^hint\b/i.test(tier.heading))
    .map((tier) => ({
      heading: tier.heading,
      body: tier.lines.join('\n').trim(),
    }));
}

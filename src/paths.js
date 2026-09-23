import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Absolute path to the repository root, wherever the repo was cloned. */
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Join a repo-relative path onto the root. */
export function fromRoot(...parts) {
  return path.join(ROOT, ...parts);
}

/** Turn an absolute path back into the short form printed to the learner. */
export function relative(absolute) {
  return path.relative(ROOT, absolute) || '.';
}

import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fromRoot } from './paths.js';
import { absolutePaths } from './present.js';
import { runTests, testFiles } from './runner.js';

const REQUIRED_FILES = ['README.md', 'exercise.js', 'exercise.test.js', 'solution.js', 'hints.md'];

/**
 * True when a tracked file inside the folder has uncommitted modifications.
 * Brand new, untracked content is fine: there is no earlier version to lose.
 */
function hasUncommittedChanges(folder) {
  try {
    const output = execFileSync('git', ['status', '--porcelain', '--', folder], {
      cwd: fromRoot(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return output
      .split('\n')
      .filter(Boolean)
      .some((line) => !line.startsWith('??'));
  } catch {
    return false; // Not a git repository: nothing to protect.
  }
}

/**
 * Run an item's tests against a given exercise file, in a throwaway copy of the
 * folder. The learner's files are never written to, so a crash here cannot
 * leave a solution sitting in exercise.js.
 */
async function runInCopy(folder, { useSolution }) {
  const scratch = mkdtempSync(path.join(tmpdir(), 'learn-verify-'));
  try {
    cpSync(folder, scratch, { recursive: true });
    // The copy lives outside the repo, so it needs its own module declaration.
    writeFileSync(path.join(scratch, 'package.json'), '{ "type": "module" }\n');
    if (useSolution) {
      cpSync(path.join(scratch, 'solution.js'), path.join(scratch, 'exercise.js'));
    }
    return await runTests(testFiles(scratch));
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

function checkReadme(text, problems) {
  if (!/^#\s+\S/m.test(text)) problems.push('README.md has no top-level title');
  if (!text.includes('## Check yourself')) problems.push('README.md has no "## Check yourself" quiz');
  if (!text.includes('## Your task')) problems.push('README.md has no "## Your task" section');
  if (!text.includes('<details>')) problems.push('README.md has no <details> blocks');

  const questions = (text.match(/^\d+\.\s/gm) ?? []).length;
  const answers = (text.match(/<summary>Answer<\/summary>/g) ?? []).length;
  if (answers < 5) problems.push(`README.md has ${answers} quiz answers, expected at least 5`);
  if (answers > 8) problems.push(`README.md has ${answers} quiz answers, expected at most 8`);
  if (questions < answers) problems.push('README.md has fewer numbered questions than answers');

  // Words this course does not use: they teach a stuck beginner that being
  // stuck is their fault. TODO means unfinished content.
  for (const word of ['simply', 'just', 'obviously', 'TODO']) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(text)) {
      problems.push(`README.md contains banned word "${word}"`);
    }
  }
}

function checkHints(text, problems) {
  const tiers = (text.match(/^##\s+Hint\s+\d/gm) ?? []).length;
  if (tiers !== 3) problems.push(`hints.md has ${tiers} tiers, expected 3`);
  if (/```/.test(text.split(/^##\s+Hint\s+3/m)[1] ?? '')) {
    problems.push('hints.md tier 3 contains a code block; it should be words only');
  }
}

/** Verify one exercise item. Returns { id, ok, problems }. */
export async function verifyExercise(item) {
  const problems = [];
  const paths = absolutePaths(item);

  for (const name of REQUIRED_FILES) {
    if (!existsSync(path.join(paths.folder, name))) problems.push(`missing ${name}`);
  }
  if (problems.length > 0) return { id: item.id, ok: false, problems };

  if (hasUncommittedChanges(item.folder)) {
    return {
      id: item.id,
      ok: false,
      skipped: true,
      problems: ['has uncommitted changes; commit or stash them before verifying'],
    };
  }

  checkReadme(readFileSync(paths.readme, 'utf8'), problems);
  checkHints(readFileSync(paths.hints, 'utf8'), problems);

  const stub = readFileSync(paths.exercise, 'utf8');
  if (!stub.includes('not implemented')) {
    problems.push('exercise.js does not throw "not implemented"');
  }

  const stubRun = await runInCopy(paths.folder, { useSolution: false });
  if (stubRun.failed === 0) {
    problems.push('the tests pass against the stub, so they do not test anything');
  }

  const solutionRun = await runInCopy(paths.folder, { useSolution: true });
  if (solutionRun.failed > 0) {
    problems.push(
      `solution.js fails ${solutionRun.failed} test(s): ${solutionRun.failures
        .map((failure) => failure.name)
        .join('; ')}`,
    );
  }
  if (solutionRun.passed === 0) problems.push('no tests ran against solution.js');

  return { id: item.id, ok: problems.length === 0, problems, tests: solutionRun.passed };
}

/** Verify one article: it exists, has a title, and is not a placeholder. */
export function verifyArticle(item) {
  const problems = [];
  const file = fromRoot(item.folder);

  if (!existsSync(file)) {
    problems.push(`missing ${item.folder}`);
    return { id: item.id, ok: false, problems };
  }

  const text = readFileSync(file, 'utf8');
  if (!/^#\s+\S/m.test(text)) problems.push('no top-level title');
  if (text.split(/\s+/).length < 150) problems.push('shorter than 150 words');
  if (/TODO/i.test(text)) problems.push('contains a TODO');

  return { id: item.id, ok: problems.length === 0, problems };
}

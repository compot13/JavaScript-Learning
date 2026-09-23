import { readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { run } from 'node:test';

/** The *.test.js files inside one item folder. */
export function testFiles(folder) {
  if (!existsSync(folder)) return [];
  return readdirSync(folder)
    .filter((name) => name.endsWith('.test.js'))
    .sort()
    .map((name) => path.join(folder, name));
}

function readableError(error) {
  if (!error) return 'The test failed without saying why.';
  const cause = error.cause ?? error;

  if (cause.code === 'ERR_ASSERTION' || cause.operator) {
    const lines = [cause.message.trim()];
    if (!cause.message.includes('!==') && cause.expected !== undefined) {
      lines.push(`expected: ${JSON.stringify(cause.expected)}`);
      lines.push(`actual:   ${JSON.stringify(cause.actual)}`);
    }
    return lines.join('\n');
  }
  return cause.message ?? String(cause);
}

/**
 * Run a set of test files in child processes and collect a plain result.
 * Returns { passed, failed, failures: [{ name, file, message }] }.
 */
export async function runTests(files) {
  const failures = [];
  let passed = 0;
  let stderr = '';

  const stream = run({ files, concurrency: false });

  for await (const event of stream) {
    if (event.type === 'test:pass' && event.data.details?.type !== 'suite') {
      passed += 1;
    } else if (event.type === 'test:fail') {
      const error = event.data.details?.error;
      // A suite only fails because a test inside it failed; that is already reported.
      if (error?.failureType === 'subtestsFailed') continue;
      failures.push({
        name: event.data.name,
        file: event.data.file,
        message: readableError(error),
      });
    } else if (event.type === 'test:stderr') {
      stderr += event.data.message;
    }
  }

  return { passed, failed: failures.length, failures, stderr };
}

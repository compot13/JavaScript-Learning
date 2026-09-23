#!/usr/bin/env node
import { today } from '../src/commands/today.js';
import { check } from '../src/commands/check.js';
import { done } from '../src/commands/done.js';
import { hint } from '../src/commands/hint.js';
import { solve } from '../src/commands/solve.js';
import { status } from '../src/commands/status.js';
import { list } from '../src/commands/list.js';
import { test } from '../src/commands/test.js';
import { verify } from '../src/commands/verify.js';
import { parseArgs } from '../src/args.js';

const USAGE = `
learn - a self-study JavaScript course

Usage:  npm run learn -- <command> [item]

  today             the work for today: a JavaScript exercise, a LeetCode
                    problem, and a background article when one is due
  check             run the tests for everything open and mark what passes
  done <id>         finish a reading item, which has no tests
  hint <id>         reveal the next hint; add --all for every hint,
                    or --reset to start the hints over
  solve <id>        show the reference answer (recorded as solved with help)
  status            streak, what you finished today, progress per track
  list <track>      every item of a track: js, leetcode or basics
  verify [id...]    author check: the five files exist, the tests fail against
                    the stub and pass against the solution

Run one item's tests directly:  npm run test -- js-001

An <id> can be written several ways: js-001, 001, 1, lc-1480, 1480, two-sum.
`.trim();

const COMMANDS = { today, check, done, hint, solve, status, list, test, verify };

export async function main(argv) {
  const { command, args, flags } = parseArgs(argv);

  if (!command || flags.help || command === 'help') {
    console.log(USAGE);
    return command ? 0 : 1;
  }

  const handler = COMMANDS[command];
  if (!handler) {
    console.error(`There is no "${command}" command.\n`);
    console.error(USAGE);
    return 1;
  }

  return (await handler(args, flags)) ?? 0;
}

process.exitCode = await main(process.argv.slice(2));

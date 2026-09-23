# Plan

The build order, the file contract, and the full item list. Written first so the
curriculum can exist as an ordered list on day one and fill in behind it.

## 1. Layout

```
bin/learn.js            entry point, argument parsing, command dispatch
src/
  syllabus.js           loads syllabus/*.json, resolves ids, computes ordering
  progress.js           reads/writes progress.json, status transitions, streaks
  scheduler.js          decides what "today" is (carry-over, gating, idempotency)
  runner.js             runs node --test on one folder, extracts failures
  render.js             plain-text output: bars, wrapping, item cards
  hints.js              parses hints.md into three tiers
  verify.js             author-side content check
  paths.js              repo-root-relative path helpers
  commands/             one file per CLI command
js/NNN-slug/            README.md exercise.js exercise.test.js solution.js hints.md
leetcode/NNNN-slug/     same five files
basics/NNN-slug.md      article only
syllabus/{js,leetcode,basics}.json
progress.json           the only mutable state
test/                   tests for the CLI itself
```

Node 20+ baseline. ES modules everywhere (`"type": "module"`). No dependencies:
tests run on `node --test`, argument parsing is hand-rolled.

## 2. Ids and folders

- JS items: id `js-001`, folder `js/001-variables-and-types`.
- LeetCode items: id `lc-0001`, folder `leetcode/0001-two-sum`. The number is
  LeetCode's own, so the folder matches the problem the learner submits. Course
  order lives in the syllabus, not in the number.
- Basics items: id `basics-001`, file `basics/001-what-javascript-runs-on.md`.

The resolver accepts a full id (`js-001`), a bare number (`1`, `001` — assumed
to be the JS track), a LeetCode number (`lc-1`, `lc-1480`), or a unique slug
fragment (`two-sum`). Anything ambiguous lists the candidates instead of
guessing.

## 3. Syllabus contract

`syllabus/*.json` lists every item in fixed course order, authored or not:

```json
{
  "id": "js-009",
  "title": "Arrays: indexing, push/pop, slice vs splice",
  "folder": "js/009-arrays",
  "teaches": "One plain sentence about what the learner can do afterwards.",
  "requires": ["js-006"],
  "authored": false
}
```

- `requires` lists item ids that must be finished first. It is a real gate: the
  scheduler never deals an item whose requirements are unfinished, it takes the
  next eligible item in syllabus order instead. This is how the LeetCode track
  waits for the JavaScript the problem needs.
- Basics entries carry `dueBefore` (a JS item id) instead of `requires`. The
  article is dealt on the day the scheduler reaches that JS item.
- `authored` flips to `true` only via `learn verify`. The CLI reads the syllabus
  and never scans directories, so an unauthored entry is inert but visible.

## 4. File contract per exercise item

| File | Rule |
| --- | --- |
| `README.md` | Title + run command, 400–800 word lesson, `<details>` common mistakes, `## Check yourself` quiz, `## Your task` |
| `exercise.js` | Exported stubs with doc comments; every body throws `new Error('not implemented')`. Contains no logic the tests could pass by transcription. |
| `exercise.test.js` | `node:test` + `node:assert/strict`. Fails against the stub, passes against the solution. Test names read as sentences. Only tests behaviour the README states. |
| `solution.js` | The reference answer, commented on the non-obvious lines. |
| `hints.md` | `## Hint 1 — Language` / `## Hint 2 — Nudge` / `## Hint 3 — Approach`. Tier 3 still contains no code. |

Quiz rules: 5–8 questions, four options, wrong options are real beginner
misconceptions, answer inside `<details>`, every answer explains the right
option *and* the most tempting wrong one, and no question leaks the task's
implementation.

## 5. CLI commands

```
npm run learn -- today            one JS exercise, one LeetCode problem, a basics article when due
npm run learn -- check            run tests for every open item, mark passing ones done
npm run learn -- done <id>        finish an article
npm run learn -- hint <id>        reveal the next tier; --all reveals all; --reset rewinds the pointer
npm run learn -- solve <id>       print solution.js, record solved_with_help
npm run learn -- status           streak, finished today, a bar per track
npm run learn -- list <track>     whole syllabus with per-item status
npm run learn -- verify [ids]     author check (see below)
npm run test -- <id>              run one item's tests directly
```

Behaviour that matters:

- `today` is idempotent per day. Items get a `dealtOn` date; re-running returns
  exactly the items dealt today. A new day carries over anything still open
  before dealing anything new.
- `check` is the only way a code item becomes `done`. On failure it prints the
  test name and the assertion, not a raw stack dump.
- `solve` closes the item as `solved_with_help`, which `status` reports
  separately so the record stays honest.
- `hint --reset` rewinds which tier comes next but leaves the reveal count.
- Every failure path ends with the command to run next.

## 6. progress.json

```json
{
  "version": 1,
  "items": {
    "js-001": {
      "status": "open | done | solved_with_help",
      "dealtOn": "2026-09-20",
      "startedAt": "2026-09-20T09:00:00.000Z",
      "completedAt": "2026-09-20T09:41:00.000Z",
      "hintsRevealed": 2,
      "nextHint": 2
    }
  }
}
```

Streaks and daily counts are derived from `completedAt` timestamps at read
time. No counters are stored, so nothing can drift out of sync.

## 7. verify

For each item: the five files exist, the tests fail against `exercise.js`, and
the tests pass with `solution.js` in its place. Only then does `authored` flip
to `true`.

One deliberate deviation from the brief: the swap happens in a throwaway copy of
the item folder rather than in place. Same guarantee, and a crash mid-run can
never leave the solution sitting in the learner's `exercise.js`. The
git-cleanliness guard stays — `verify` refuses to run on an item with
uncommitted changes, because a half-finished `exercise.js` would fail the
"stub must fail" check for the wrong reason.

## 8. Build order

1. This plan.
2. Three complete syllabus files, everything `"authored": false`.
3. The CLI, plus tests for the CLI in `test/`.
4. Content in batches of three: author, `verify`, commit.
5. Root `README.md` last, with output pasted from a real run.

## 9. JavaScript track (24 items)

| # | id | Topic |
| --- | --- | --- |
| 1 | js-001 | Variables, `let`/`const`, the basic types |
| 2 | js-002 | Strings and template literals |
| 3 | js-003 | Numbers, math, and `NaN` |
| 4 | js-004 | Booleans, comparison, `===` vs `==`, truthy/falsy |
| 5 | js-005 | `if`/`else` and the ternary |
| 6 | js-006 | Loops: `for`, `while`, `for...of` |
| 7 | js-007 | Functions: parameters, defaults, `return` |
| 8 | js-008 | Arrow functions and scope |
| 9 | js-009 | Arrays: indexing, `push`/`pop`, `slice` vs `splice` |
| 10 | js-010 | Array methods: `map`, `filter`, `find`, `some`, `every` |
| 11 | js-011 | `reduce`, on its own |
| 12 | js-012 | Objects: properties, nesting, optional chaining |
| 13 | js-013 | Destructuring, spread, rest |
| 14 | js-014 | `Object.keys` / `values` / `entries` |
| 15 | js-015 | `Map` and `Set` |
| 16 | js-016 | Sorting and comparator functions |
| 17 | js-017 | Callbacks and higher-order functions |
| 18 | js-018 | Closures |
| 19 | js-019 | Errors: `throw`, `try`/`catch`, stack traces |
| 20 | js-020 | JSON: `parse`, `stringify` |
| 21 | js-021 | Classes, methods, `this` |
| 22 | js-022 | Modules: `import`/`export` |
| 23 | js-023 | Promises |
| 24 | js-024 | `async`/`await` and `fetch` |

## 10. LeetCode track (27 items, easiest first)

Ordered by how much the learner has to hold in their head, not by number. Each
entry's `requires` names the JavaScript it depends on, so the scheduler holds a
problem back until that lesson is finished.

| # | id | Problem | Needs |
| --- | --- | --- | --- |
| 1 | lc-1480 | Running Sum of 1d Array | js-009 |
| 2 | lc-1929 | Concatenation of Array | js-009 |
| 3 | lc-0412 | Fizz Buzz | js-009 |
| 4 | lc-0344 | Reverse String | js-009 |
| 5 | lc-0058 | Length of Last Word | js-009 |
| 6 | lc-0066 | Plus One | js-009 |
| 7 | lc-0283 | Move Zeroes | js-009 |
| 8 | lc-0268 | Missing Number | js-009 |
| 9 | lc-0121 | Best Time to Buy and Sell Stock | js-009 |
| 10 | lc-0392 | Is Subsequence | js-009 |
| 11 | lc-0125 | Valid Palindrome | js-010 |
| 12 | lc-0014 | Longest Common Prefix | js-009 |
| 13 | lc-0704 | Binary Search | js-009 |
| 14 | lc-0088 | Merge Sorted Array | js-009 |
| 15 | lc-0509 | Fibonacci Number | js-007 |
| 16 | lc-0070 | Climbing Stairs | js-007 |
| 17 | lc-0217 | Contains Duplicate | js-015 |
| 18 | lc-0242 | Valid Anagram | js-015 |
| 19 | lc-0383 | Ransom Note | js-015 |
| 20 | lc-0169 | Majority Element | js-015 |
| 21 | lc-0001 | Two Sum | js-015 |
| 22 | lc-0013 | Roman to Integer | js-015 |
| 23 | lc-0202 | Happy Number | js-015 |
| 24 | lc-0020 | Valid Parentheses | js-015 |
| 25 | lc-0206 | Reverse Linked List | js-012 |
| 26 | lc-0021 | Merge Two Sorted Lists | js-012 |
| 27 | lc-0104 | Maximum Depth of Binary Tree | js-012 |

The last three teach their data structure from scratch in the README before the
problem starts. Nothing here needs dynamic programming, graphs or backtracking;
Climbing Stairs is taught as "add the last two numbers", which is what it is.

## 11. Basics track (6 articles)

| id | Article | Dealt before |
| --- | --- | --- |
| basics-001 | What JavaScript runs on | js-001 |
| basics-002 | What a test is and why this course uses them | js-002 |
| basics-003 | How to read an error message | js-004 |
| basics-004 | What npm and package.json are | js-008 |
| basics-005 | Values and references | js-013 |
| basics-006 | What JSON is for | js-020 |

Articles are read-only and finished with `learn done <id>`.

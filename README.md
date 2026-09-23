# Learn JavaScript

A self-study course for someone who can read a little JavaScript but cannot yet
write it from a blank file.

It serves you one day of work at a time: a JavaScript lesson with an exercise,
a LeetCode problem once you have the JavaScript it needs, and a short
background article when one is due. Every exercise has tests, so you never have
to wonder whether you got it right.

There are **24 JavaScript lessons**, **27 LeetCode problems** (easy only, in
order of how much you have to hold in your head) and **6 background articles**.
Nothing appears before the things it depends on.

---

## What you need

Node.js version 20 or newer. Nothing else - this course has no dependencies, so
there is nothing to install and no `npm install` step.

Check what you have by opening a terminal and typing:

```bash
node --version
```

If you see a version number like `v22.11.0`, you are ready. If the number is
below 20, or the command is not found, install the current version from
<https://nodejs.org> and try again.

New to the terminal? It is the program where you type commands instead of
clicking. On macOS it is called Terminal, on Windows it is PowerShell, on Linux
it is usually Terminal. `cd some-folder` moves into a folder; `ls` (or `dir` on
Windows) lists what is in the one you are in.

## Getting started

Download the course and move into its folder:

```bash
git clone <this repository's url> learn-javascript
```

```bash
cd learn-javascript
```

Then ask for today's work:

```bash
npm run learn -- today
```

You will see something like this:

```
Today - Sunday, September 20
----------------------------

1. js-001  Variables, let/const, and the basic types
   Teaches  Store a value in a name, choose between let and const, and say what type a value is.
   Read     js/001-variables-and-types/README.md
   Edit     js/001-variables-and-types/exercise.js
   Test     npm run test -- js-001
   Stuck    npm run learn -- hint js-001

2. basics-001  What JavaScript runs on
   Teaches  The difference between the browser and Node, and which one this course uses.
   Read     basics/001-what-javascript-runs-on.md
   Finish   npm run learn -- done basics-001

No LeetCode item today: "Running Sum of 1d Array" needs js-009 finished first.

When you think you are finished, run:  npm run learn -- check
(Dealt on 2026-09-20.)
```

The LeetCode track stays quiet for the first week or so. Those problems need
loops and arrays, and the message tells you which lesson unlocks the next one.

## Your first exercise

**1. Read the lesson.** Open `js/001-variables-and-types/README.md`. It teaches
the concept with small examples you can paste into the terminal, then lists the
mistakes beginners actually make here, with the real error messages.

**2. Answer the quiz.** Each lesson ends with `## Check yourself` - five to
eight questions answerable from the lesson you have read. The answers are
hidden behind click-to-expand toggles, and each one explains why the right
answer is right *and* what is wrong with the most tempting wrong one. Answer
before you expand.

**3. Do the task.** Open `js/001-variables-and-types/exercise.js` in any text
editor. It holds function stubs like this:

```js
export function typeOf(value) {
  throw new Error('not implemented');
}
```

Replace the `throw` line with your own code. Nothing in the file can be copied
into an answer - you write the logic.

**4. Run the tests.**

```bash
npm run test -- 001
```

While the stub is untouched you get:

```
FAIL  js-001  9 failing, 0 passing
  Every test failed with "not implemented", so the functions are
  still the ones the exercise shipped with. Replace the throw lines
  with your own code.
```

When your code is right:

```
PASS  js-001  9 tests

All green. Record it with:  npm run learn -- check
```

**5. Record it.**

```bash
npm run learn -- check
```

```
js-001  Variables, let/const, and the basic types
  PASSED  9 tests. Marked done.

Everything open is passing. Run "npm run learn -- today" tomorrow for the next items.
```

Articles have no tests, so you finish those yourself:

```bash
npm run learn -- done basics-001
```

Then come back tomorrow and run `npm run learn -- today` again.

## When you are stuck

Being stuck is the normal state of learning to program. There are three levels
of help, and they are meant to be used in order.

```bash
npm run learn -- hint 001
```

- **Hint 1** names the built-in method or syntax to look at, with a link to its
  documentation. It says nothing about the approach.
- **Hint 2** asks the question that decides the answer, so you work it out.
- **Hint 3** describes the approach step by step, in words, with no code. You
  still type it yourself.

Run the same command again for the next one. Here is the first:

```
js-001  hint 1 of 3
--------------------

Hint 1 - Language

One operator answers the first two functions: typeof.
You write it in front of a value, with a space: typeof value.

For joining two pieces of text, the + operator is all you need here.

Need more? Run the same command again for hint 2.
```

If all three hints have not got you there:

```bash
npm run learn -- solve 001
```

That prints the reference answer and records the item as *solved with help*, so
your record stays honest. Type the answer out rather than pasting it, then make
sure you can explain each line.

Two other things worth doing when stuck: read the `<details>` block of common
mistakes in the lesson, and put `console.log` calls inside your function to see
what the values actually are. `basics/003-how-to-read-an-error-message.md`
covers how to get the useful part out of a red wall of text.

## Checking your progress

```bash
npm run learn -- status
```

```
Streak           1 day in a row
Finished today   2 (js-001, basics-001)

Progress
  js        [#-------------------] 1/24
  leetcode  [--------------------] 0/27
  basics    [###-----------------] 1/6

Nothing is open. Run "npm run learn -- today" for the next items.
```

The whole syllabus is visible from the start, whether or not you have reached
it:

```bash
npm run learn -- list js
```

```bash
npm run learn -- list leetcode
```

## Every command

| Command | What it does |
| --- | --- |
| `npm run learn -- today` | Today's items. Running it twice in one day gives you the same ones. |
| `npm run learn -- check` | Runs the tests for everything open and marks what passes. |
| `npm run learn -- done <id>` | Finishes a reading item, which has no tests. |
| `npm run learn -- hint <id>` | The next hint. Add `--all` for every hint, or `--reset` to start them over. |
| `npm run learn -- solve <id>` | Shows the answer, recorded as solved with help. |
| `npm run learn -- status` | Streak, what you finished today, a bar per track. |
| `npm run learn -- list <track>` | The whole syllabus: `js`, `leetcode` or `basics`. |
| `npm run test -- <id>` | Runs one item's tests without recording anything. |
| `npm run learn -- help` | This list, in the terminal. |

The `--` before the command is npm's way of saying "the rest belongs to the
script, not to npm". `basics/004-what-npm-and-package-json-are.md` explains it.

An `<id>` can be written several ways, so use whichever is quickest:

```
js-001    001    1              the first JavaScript lesson
lc-1480   1480   running-sum    the Running Sum problem
two-sum                         any unambiguous piece of the name
```

## How the day is chosen

- One JavaScript lesson, in order.
- One LeetCode problem, but only when the JavaScript it needs is finished. Two
  Sum waits for `Map` and `Set`; Reverse Linked List waits for objects.
- A background article when the course has reached the point it is useful.
- Anything you did not finish carries over to the next day before anything new
  is dealt.

Progress lives in `progress.json` at the root of the repository. It is a plain
text file you can open and read. Your streak and daily counts are worked out
from the timestamps in it each time you ask, so nothing can drift out of step.

## What is in the folders

```
js/          24 lessons: variables through async / await and fetch
leetcode/    27 easy problems, ordered easiest first
basics/      6 short articles: what Node is, what a test is, how to read an error
syllabus/    the course order, as three JSON files
bin/, src/   the learn command itself
progress.json  your record
docs/plan.md   how the course is built, if you are curious
```

Each exercise folder holds the same five files:

| File | What it is |
| --- | --- |
| `README.md` | The lesson, the common mistakes, the quiz, the task |
| `exercise.js` | The file you edit |
| `exercise.test.js` | The tests that check your work |
| `solution.js` | The reference answer |
| `hints.md` | The three hints |

You are welcome to read `exercise.test.js`. The tests say exactly what is
expected, in sentences, and reading them is a fair way to understand a task.
`solution.js` is the one to leave alone until you have tried.

## A suggested rhythm

One day's work is meant to take somewhere between twenty minutes and an hour.
Doing that most days will get you further than a six-hour session at the
weekend, because the point is to keep meeting the same ideas until they stop
being new.

If a lesson feels easy, still do the exercise - writing it is what moves it
from "I followed that" to "I can write that".

`playground.js` at the root is a scratch file for trying things out. Run it
with:

```bash
node playground.js
```

## For anyone editing the course

`npm run learn -- verify` checks every authored item: that its five files
exist, that the README has a quiz and a task, that the tests **fail** against
the stub, and that they **pass** against the solution. Only items that pass get
`"authored": true` in the syllabus, and the `today` command only ever deals
authored items.

The tests for the command-line tool itself are separate:

```bash
npm run test:cli
```

`docs/plan.md` has the full design: the file contract, the scheduling rules and
the complete item list for each track.

# How to read an error message

An error message is not the program telling you off. It is the most specific
description available of what went wrong, written by someone who was trying to
help. The skill is knowing which parts to read.

## The four parts

```
TypeError: Cannot read properties of undefined (reading 'city')
    at cityOf (/home/you/course/js/012-objects/exercise.js:14:23)
    at Object.<anonymous> (/home/you/course/js/012-objects/exercise.test.js:8:3)
    at node:internal/main/run_main_module:23:47
```

1. **The type**: `TypeError`.
2. **The message**: what went wrong in words.
3. **The location**: `exercise.js:14:23` - line 14, column 23.
4. **The stack**: the calls that led there, most recent first.

Read it in that order and stop as soon as you know enough. Most of the time the
first line and the first `at` line are the whole story.

## The types worth recognising

**`SyntaxError`** - the file could not be understood as JavaScript, so nothing
in it ran. Usually a missing bracket, brace or quote. The reported line is
where the engine noticed, which can be a line or two after the real mistake.

```
SyntaxError: Unexpected end of input
```

**`ReferenceError`** - a name does not exist. A typo, a missing import, or a
variable used above the line that declares it.

```
ReferenceError: totl is not defined
ReferenceError: Cannot access 'total' before initialization
```

Those two are different: the first name exists nowhere, the second exists but
its line has not run yet.

**`TypeError`** - the name exists, but the value is not the kind of thing you
used it as. This is the most common one in real work.

```
TypeError: x is not a function
TypeError: Cannot read properties of undefined (reading 'name')
```

**`RangeError`** - a number was outside the allowed range, or a function called
itself until the stack ran out.

```
RangeError: Maximum call stack size exceeded
```

## The message that confuses everyone

```
TypeError: Cannot read properties of undefined (reading 'city')
```

The property named in the brackets, `city`, is the one you *asked for*. The
thing that was missing is whatever came **before** it.

```js
user.address.city
```

`user.address` was `undefined`, so asking it for `city` failed. Go and find out
why `address` is not there. Do not go looking for `city`.

## Finding your own code in the stack

The stack often starts inside Node or a library:

```
    at node:internal/modules/run_main:1
    at /home/you/project/node_modules/whatever/index.js:44:11
    at loadUser (/home/you/project/app.js:12:5)
```

Scroll down to the first line naming a file **you** wrote. That is where your
part of the problem starts, and it is where to put your first `console.log`.

## The three questions

When you are stuck, these three in order solve most problems:

1. **What line?** The error tells you. Open it.
2. **What is actually in the variables on that line?** Print them:
   `console.log({ user, address: user.address });`
   The braces make the output say which value is which.
3. **Where did that value come from?** Work backwards to where it was last
   assigned. The bug is usually there, not where the crash happened.

## Errors are better than silence

A crash gives you a type, a message and a line number. The worse case is code
that carries on quietly with `undefined` and produces a wrong answer three
functions later. When something makes no sense and there is no error, look for
the place a value went missing without complaint.

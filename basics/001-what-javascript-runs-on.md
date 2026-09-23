# What JavaScript runs on

JavaScript does not run on its own. It needs a program to read it and carry out
the instructions. That program is called an **engine**, and where the engine
lives changes what your code can do.

## The browser

JavaScript was made in 1995 for web pages. Chrome, Firefox and Safari each ship
an engine, and the code they run is the code a website sends them.

In a browser, JavaScript can change the page, respond to clicks, and make
requests to servers. It cannot read files on your hard disk or open a network
port, because a page you have never heard of should not be able to read your
documents.

## Node

In 2009 someone took Chrome's engine out of the browser and wrapped it in a
program that could run on a server. That is **Node.js**, usually called Node.

Node has no page to change and no clicks to respond to. What it has instead is
your computer: it can read and write files, start servers, and run programs.
It is how JavaScript is used for command line tools, web servers and build
systems.

When you type `node something.js`, Node reads that file and runs it.

## Which one this course uses

Node. Everything here runs in a terminal.

That means some things you may have seen in tutorials do not exist here:

- `document` and `window` are browser features. In Node they are not defined.
- `alert` does not exist. `console.log` prints to the terminal instead.
- There is no page, so nothing is displayed unless you print it.

Most of the language is identical in both. Variables, functions, arrays,
objects, loops, promises - all the same. The difference is what is available
*around* the language.

## Checking what you have

```
node --version
```

If that prints something like `v22.11.0`, Node is installed and the number is
its version. This course needs 20 or higher. If it says the command is not
found, Node is not installed yet.

## Running a file

Put this in a file called `hello.js`:

```js
console.log('hello');
```

Then, in the same folder:

```
node hello.js
```

You get `hello` printed in the terminal, and Node exits. It runs your file from
top to bottom and stops. Nothing keeps running afterwards unless you asked for
something that waits, like a server or a timer.

## The REPL

Typing `node` with no file name opens a prompt where each line runs as you
enter it:

```
$ node
> 2 + 2
4
> 'hi'.toUpperCase()
'HI'
> .exit
```

It is useful for checking what a method does without writing a file. This
course's `playground.js` fills the same role and keeps what you tried.

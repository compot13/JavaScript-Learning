# What npm and package.json are

You have typed `npm run learn -- today` a few times by now. This is what it
does.

## npm

**npm** is the package manager that comes with Node. You did not install it
separately; it arrived with Node. It does two jobs:

1. Installs code other people wrote.
2. Runs commands defined in your project.

This course uses only the second one. It has no dependencies, so there is
nothing to install.

## package.json

Every JavaScript project has a file called `package.json` at its root. It
describes the project. Here is this one, shortened:

```json
{
  "name": "learn-javascript",
  "type": "module",
  "engines": { "node": ">=20" },
  "scripts": {
    "learn": "node bin/learn.js",
    "test": "node bin/learn.js test"
  }
}
```

- **`name`** identifies the project.
- **`type": "module"`** says the `.js` files use `import` and `export` rather
  than the older `require`. It is why lesson 22 works the way it does.
- **`engines`** records which Node versions the project expects.
- **`scripts`** is a list of named commands.

## What `npm run` does

`npm run learn` looks up `learn` in `scripts` and runs what it finds:
`node bin/learn.js`. That is all. It is a way of giving a long command a short
name, and of recording that command where everyone can find it.

## The two dashes

```
npm run learn -- today
```

Without `--`, npm would keep `today` for itself. The `--` means "everything
after this belongs to the command, not to npm". So the command that actually
runs is:

```
node bin/learn.js today
```

You can skip npm entirely and type that. The npm form is shorter to remember
and does not depend on where the file lives.

## Dependencies, for when you meet them

Most projects list packages they need:

```json
{
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

`npm install` reads that list, downloads each package from the npm registry
into a folder called `node_modules`, and records the exact versions in
`package-lock.json`.

Three things worth knowing before you meet your first project with
dependencies:

- **`node_modules` is disposable.** It is never committed to git. Delete it and
  `npm install` rebuilds it.
- **`package-lock.json` is not disposable.** It pins the exact versions, so
  everyone gets the same ones. Commit it.
- **`^4.18.2`** means "4.18.2 or any later 4.x". The caret is why two people can
  run `npm install` a month apart and get different code, and why the lock file
  exists.

## Commands you will use

```
npm install            install everything in package.json
npm install express    add a package and record it
npm run <name>         run a script from package.json
npm run                list the available scripts
npm test               shorthand for npm run test
```

Run `npm run` on its own in this folder to see what this course defines.

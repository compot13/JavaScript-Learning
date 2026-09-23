# What JSON is for

Programs need to send data to each other, and to store it between runs. Neither
of those can carry a JavaScript object, because an object only exists inside one
running program's memory. What travels is **text**.

**JSON** is an agreed way of writing data as text.

## The problem it solves

You have this in Node:

```js
const user = { name: 'Ada', age: 36 };
```

You want to send it to a Python program, save it in a file, or post it to a
server. None of those can take a JavaScript object. They take bytes.

So you convert it to text:

```
{"name":"Ada","age":36}
```

Now it can be written to a file, sent over the network, or pasted into an
email. At the other end, any language can turn that text back into its own kind
of object. Python gets a dictionary, Java gets a map, JavaScript gets an object.

That round trip - **serialise** on the way out, **parse** on the way in - is
what JSON is for.

## Why this format won

JSON was taken from JavaScript's object syntax in the early 2000s, at a point
when the main alternative was XML:

```xml
<user><name>Ada</name><age>36</age></user>
```

```json
{"name": "Ada", "age": 36}
```

Both say the same thing. One is shorter, easier to read, and maps directly onto
the data structures every language already has. It became the default for web
APIs and never stopped.

## What it can hold

Six things, and nothing else:

- strings, in double quotes
- numbers
- `true` and `false`
- `null`
- arrays
- objects

That is the entire format. There are no dates, no functions, no comments and no
undefined. This is deliberate: a format that every language can read has to
stick to what every language has.

## Where you will meet it

- **Web APIs.** Almost every request and reply is JSON.
- **Configuration files.** `package.json` is JSON, which is why it has no
  comments in it.
- **Saved data.** This course's `progress.json` is a JSON file, and you can
  open it in any text editor and read your own record.
- **Log files**, when each line is one JSON object, so machines can read them.

## The bits that catch people

**Keys need double quotes.** `{name: "Ada"}` is valid JavaScript and invalid
JSON. Hand-written JSON fails this way constantly.

**No trailing comma.** `{"a": 1,}` is an error. JavaScript allows it, JSON does
not.

**No comments.** There is nowhere to explain a config value. This is the most
complained-about decision in the format's history.

**Dates become strings.** JSON has no date type, so a date is written as text
like `"2026-01-01T00:00:00.000Z"` and comes back as a string. You convert it
yourself.

## Seeing it for yourself

`progress.json` in this repository is a real JSON file that the course writes
after every command. Open it. It is your own record, in a format you can read,
and nothing in it is hidden from you.

/**
 * Split command line tokens into a command, positional arguments and flags.
 *   ["hint", "js-001", "--all"] -> { command: "hint", args: ["js-001"], flags: { all: true } }
 */
export function parseArgs(argv) {
  const args = [];
  const flags = {};

  for (const token of argv) {
    if (token.startsWith('--')) {
      const [name, value] = token.slice(2).split('=');
      flags[name] = value ?? true;
    } else {
      args.push(token);
    }
  }

  return { command: args.shift(), args, flags };
}

// Declared outside every function, so it is created once and kept.
let lastId = 0;

// A concise body: no braces, so the expression is returned.
export const double = (n) => n * 2;

export const initialsOf = (fullName) =>
  fullName[0].toUpperCase() + fullName[fullName.indexOf(' ') + 1].toUpperCase();

export const nextId = () => {
  // Braces here, because there are two statements to run.
  lastId += 1;
  return lastId;
};

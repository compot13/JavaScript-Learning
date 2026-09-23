export function makeBook(title, author) {
  // The parameter names match the keys, so each pair reads name: value.
  return { title: title, author: author, read: false };
}

export function bookLabel(book) {
  return `${book.title} by ${book.author}`;
}

export function cityOf(user) {
  // ?. stops safely when address is missing; ?? supplies the fallback when the
  // whole expression came out as undefined.
  return user.address?.city ?? 'Unknown';
}

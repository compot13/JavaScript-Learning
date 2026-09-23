export function delay(ms) {
  // resolve is handed to setTimeout to be called once the time is up.
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function doubleLater(n, ms) {
  // Here resolve is called with a value, so the wrapper arrow is needed.
  return new Promise((resolve) => {
    setTimeout(() => resolve(n * 2), ms);
  });
}

export function sumOfPromises(promises) {
  // Promise.all turns an array of promises into a promise of an array.
  return Promise.all(promises).then((numbers) =>
    numbers.reduce((total, n) => total + n, 0),
  );
}

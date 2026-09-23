export async function loadTitle(url, fetchFn = fetch) {
  const response = await fetchFn(url);
  // A 404 is a real reply, so fetch does not throw. Check it yourself.
  if (!response.ok) {
    throw new Error(`request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data.title;
}

export async function loadAllTitles(urls, fetchFn = fetch) {
  // map starts every request, and Promise.all waits for the whole set.
  return Promise.all(urls.map((url) => loadTitle(url, fetchFn)));
}

export async function loadTitleOr(url, fallback, fetchFn = fetch) {
  try {
    return await loadTitle(url, fetchFn);
  } catch {
    // await turns a rejected promise into a thrown error, so one catch covers
    // a failed request, a bad status and a body that will not parse.
    return fallback;
  }
}

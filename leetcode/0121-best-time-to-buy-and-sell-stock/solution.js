export function maxProfit(prices) {
  // Larger than any real price, so the first day always replaces it.
  let cheapest = Infinity;
  // Not trading is always allowed, and earns nothing.
  let best = 0;

  for (const price of prices) {
    // Selling today can only use a price from a day already passed.
    best = Math.max(best, price - cheapest);
    cheapest = Math.min(cheapest, price);
  }

  return best;
}

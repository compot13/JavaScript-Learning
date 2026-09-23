# LeetCode 121: Best Time to Buy and Sell Stock

Run the tests for this problem with:

```
npm run test -- lc-121
```

Problem on LeetCode: <https://leetcode.com/problems/best-time-to-buy-and-sell-stock/>

## The lesson

`prices[i]` is the price of a share on day `i`. You may buy on one day and sell
on a **later** day, once. Return the largest profit available, or `0` if there
is no way to make one.

```
[7, 1, 5, 3, 6, 4] -> 5    buy at 1 on day 1, sell at 6 on day 4
[7, 6, 4, 3, 1]    -> 0    prices only fall, so do not trade
```

### Why the obvious answer is wrong

The largest profit is not "highest price minus lowest price". In
`[7, 1, 5, 3, 6, 4]` that happens to work, but in `[2, 9, 1]` the highest is 9
and the lowest is 1, giving 8 - and you cannot buy on day 2 and sell on day 0.
The buy has to come first. The real answer there is 7.

Any approach that ignores the order is wrong, even when it passes the examples.

### The one-pass idea

Walk through the days once, keeping two things:

- the **cheapest price seen so far**
- the **best profit seen so far**

On each day, the best you could do if you sold today is today's price minus the
cheapest price you have already seen. Compare that against your best so far and
keep the larger. Then update the cheapest price if today is cheaper.

```
[7, 1, 5, 3, 6, 4]

day  price  cheapest so far  sell today  best profit
0    7      7                0           0
1    1      1                0           0
2    5      1                4           4
3    3      1                2           4
4    6      1                5           5
5    4      1                3           5
```

Answer: 5.

The cheapest price can only ever be a day you have already passed, so the buy
is always before the sell. The ordering rule is built into the shape of the
loop rather than checked anywhere.

### The pieces

Start the cheapest at the first price - or at `Infinity`, which is larger than
every real price, so the first day always replaces it:

```js
let cheapest = Infinity;
let best = 0;
```

`Math.max(a, b)` from lesson 3 keeps the larger of two numbers, and
`Math.min` the smaller. Starting `best` at `0` gives the "do not trade" answer
for free: when every price falls, no day beats zero.

### Why not compare every pair?

For each buy day, try every later sell day. Correct, and the work grows with
the square of the number of days - 30,000 days would be 450 million
comparisons. The one-pass version does one subtraction per day.

<details>
<summary>Common mistakes</summary>

**Highest minus lowest.**

```js
Math.max(...prices) - Math.min(...prices);
```

Gives 8 for `[2, 9, 1]`, a trade you cannot make, because the low comes after
the high.

**Starting the best profit at the first difference.**

Starting `best` anywhere other than 0 can produce a negative answer for a
falling market. The problem says do not trade, which is a profit of 0.

**Updating the cheapest price before measuring today's sale.**

If you lower the cheapest price to today's price first, you can end up buying
and selling on the same day for a profit of 0 - harmless here, but the habit
hides real ordering bugs.

</details>

## Check yourself

1. What is the answer for `[7, 1, 5, 3, 6, 4]`?

<details><summary>Answer</summary>

`5`: buy at 1, sell at 6. The tempting wrong answer is 6, from 7 down to 1 -
that is a loss, and you cannot sell before you buy.

</details>

2. What is the answer for `[7, 6, 4, 3, 1]`?

<details><summary>Answer</summary>

`0`. Every day is cheaper than the last, so there is no profitable trade and
the rule is to make none. The tempting wrong answer is `-6`, the least bad
trade - the problem asks for profit, and no trade is always available.

</details>

3. Why is "highest minus lowest" wrong?

<details><summary>Answer</summary>

Because the lowest price may come after the highest, and you cannot sell before
you buy. In `[2, 9, 1]` it gives 8 instead of 7. The tempting wrong answer is
that it works whenever the array is not sorted downwards - it works only when
the low happens to come first.

</details>

4. What two values does the one-pass version keep?

<details><summary>Answer</summary>

The cheapest price seen so far and the best profit so far. The tempting wrong
answer is "the buy day and the sell day" - you never need the days themselves,
only the numbers.

</details>

5. Why does the buy automatically come before the sell?

<details><summary>Answer</summary>

Because the cheapest price is only ever drawn from days you have already
visited. The tempting wrong answer is that you have to compare indexes - the
loop's order does that work for you.

</details>

6. What should `best` start at, and why?

<details><summary>Answer</summary>

`0`, because not trading is always allowed and earns nothing. The tempting
wrong answer is the first price or a negative number, both of which can produce
a loss as the final answer.

</details>

## Your task

Open `leetcode/0121-best-time-to-buy-and-sell-stock/exercise.js` and write
`maxProfit(prices)`.

It returns the largest profit from buying on one day and selling on a later
day, or `0` when no profit is possible. Walk the array once.

```js
maxProfit([7, 1, 5, 3, 6, 4]) // 5
maxProfit([7, 6, 4, 3, 1])    // 0
maxProfit([2, 9, 1])          // 7
maxProfit([])                 // 0
```

When the tests pass, record it with `npm run learn -- check`.

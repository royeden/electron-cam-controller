// THX <3 <3 <3
// https://github.com/processing/p5.js/blob/eb5ee55a2d9e5824a0ed2699b66ea337a3585e1a/src/math/calculation.js

export function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
}

export function map(n, start1, stop1, start2, stop2, withinBounds) {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
}

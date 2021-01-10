// THX <3 <3 <3
// https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md/#currying-more-than-one-argument

export function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(...nextArgs) {
      const args = [...prevArgs, ...nextArgs];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

export function idempotence(value) {
  return value;
}

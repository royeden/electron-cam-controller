// THX <3 <3 <3
// https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md/#user-content-curry

export function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      const args = [...prevArgs, nextArg];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

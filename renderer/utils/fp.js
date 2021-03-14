// THX <3 <3 <3
// https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md/#currying-more-than-one-argument

/**
 * A function that can be currified
 * @callback currifiableFunction
 * @param {*|*[]} params Params of the function that will be currified
 * @returns {*} Return value of the original function
 */

/**
 * Creates a curried function that can also use partial application.
 * @param {currifiableFunction} fn
 * @param {number} arity
 * @returns {*} currified function
 */

export function curry(fn, arity = fn.length) {
  return (
    (
      /**
       * The function that will be used in the next invocation
       * @param {*|*[]} prevArgs Previous params already applied to the curried function
       * @returns {curried}
       */
      function nextCurried(prevArgs) {
      return (
        /**
         * The curried function
         * @param {*|*[]} nextArgs New params applied to the curried function that will merge with previous params
         * @returns {*}
         */
        function curried(...nextArgs) {
          const args = [...prevArgs, ...nextArgs];

          if (args.length >= arity) {
            return fn(...args);
          } else {
            return nextCurried(args);
          }
        }
      );
    })([])
  );
}

/**
 * Returns the provided value.
 * Used as a placeholder.
 * @param {*} value
 * @returns {*} value
 */
export function identity(value) {
  return value;
}

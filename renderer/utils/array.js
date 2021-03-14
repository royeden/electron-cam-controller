import { mergeDeep, check as objectCheck } from "./object";

/**
 * Throws error if param is not array
 * @param {*} possibleArray
 */
export function check(possibleArray) {
  if (!Array.isArray(possibleArray))
    throw new Error(
      "Param is not an array. Please use arrays with this function!"
    );
}

/**
 * Inserts value into an array at index with non-mutating splice.
 * @param {Array} array Array where the value will be inserted.
 * @param {number} index Index where the value will be inserted.
 * @param {*} value Value that will be inserted at index.
 * @returns {Array} Modified array
 */
export function insert(array = [], index, value) {
  check(array);
  const output = [...array];
  output.splice(index, 0, value);
  return output;
}

/**
 * Removes value from an array at index with non-mutating splice.
 * @param {Array} array Array where the value will be removed.
 * @param {number} index Index of the value that will be removed.
 * @returns {Array} Modified array
 */
export function remove(array = [], index) {
  check(array);
  const output = [...array];
  output.splice(index, 1);
  return output;
}

/**
 * Modifies value of an array at an index with non-mutating splice.
 * @param {Array} array Array where the value will be modified.
 * @param {number} index Index where the value will be modified.
 * @param {*} value Modified value that will replace value at index.
 * @returns {Array} Modified array
 */
export function modify(array = [], index, value) {
  check(array);
  const output = [...array];
  output.splice(index, 1, value);
  return output;
}

/**
 * Merges properties of an Object array at an index with non-mutating splice.
 * @param {Object[]} array Array where the objects will be merged.
 * @param {number} index Index where the value will be merged.
 * @param {Object} value Modified value that will be merged to current value at index.
 * @returns {Object[]} Modified array
 */
export function merge(array = [], index, value = {}) {
  check(array);
  objectCheck(value);
  const output = [...array];
  objectCheck(output[index]);
  const merged = mergeDeep({ ...output[index] }, value);
  output.splice(index, 1, merged);
  return output;
}

// Thx <3 <3 <3
// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 * @returns {Object}
 */
export function mergeDeep(target, source) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

/**
 * Map object properties and return a new object.
 * @param {Object} object Object that will be mapped
 * @param {objectMapCallback} callback
 * @returns {Object} Mapped object
 */

export function objectMap(
  object = {},
  callback = function defaultCallback(value, key = "", object = {}) {
    return value;
  }
) {
  return Object.keys(object).reduce(
    (output, key) =>
      mergeDeep(output, { [key]: callback(object[key], key, object) }),
    {}
  );
}

/**
 * This callback transforms the values for the object key
 * @callback objectMapCallback
 * @param {*} value The value for the object key
 * @param {string} key The key that's being mapped
 * @param {Object} object The original object (mutable)
 * @returns {*} Value at mapped key
 */

/**
 * Throws error if param is not object
 * @param {*} possibleObject
 */
export function objectCheck(possibleObject) {
  if (!isObject(possibleObject))
    throw new Error(
      "Param is not an object. Please use objects with this function!"
    );
}

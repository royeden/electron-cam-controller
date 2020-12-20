import { useState } from "react";

import { mergeDeep, isObject } from "../../utils/mergeDeep";

/**
 * Throws error if param is not object
 * @param {*} possibleObject
 */
function objectCheck(possibleObject) {
  if (!isObject(possibleObject))
    throw new Error(
      "Param is not an object. Please use objects with this function!"
    );
}

export default function useObjectState(initialState = {}) {
  objectCheck(initialState);
  const [state, setState] = useState(initialState);
  function setObjectState(newState = {}) {
    if (typeof newState !== "function") objectCheck(newState);
    setState(newState);
  }

  function mergeObjectState(newState = {}) {
    if (typeof newState !== "function") objectCheck(newState);
    setState((prevState) =>
      typeof newState === "function"
        ? mergeDeep(prevState, newState(prevState))
        : mergeDeep(prevState, newState)
    );
  }

  return [state, setObjectState, mergeObjectState];
}

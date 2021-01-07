import { useState } from "react";

import { mergeDeep, isObject } from "../../utils/object";

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

  const setObjectState = (newState = {}) => {
    const isFunctionUpdate = typeof newState === "function";
    if (!isFunctionUpdate) objectCheck(newState);
    setState((prevState) =>
      isFunctionUpdate ? newState(prevState) : newState
    );
  };

  const mergeObjectState = (newState = {}) => {
    const isFunctionUpdate = typeof newState === "function";
    if (!isFunctionUpdate) objectCheck(newState);
    setState((prevState) =>
      isFunctionUpdate
        ? mergeDeep(prevState, newState(prevState))
        : mergeDeep(prevState, newState)
    );
  };

  return [state, setObjectState, mergeObjectState];
}

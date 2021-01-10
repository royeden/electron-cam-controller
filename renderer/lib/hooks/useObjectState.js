import { useState } from "react";

import { mergeDeep, objectCheck } from "../../utils/object";

export default function useObjectState(initialState = {}) {
  objectCheck(initialState);
  const [state, setState] = useState(initialState);

  const set = (newState = {}) => {
    const isFunctionUpdate = typeof newState === "function";
    if (!isFunctionUpdate) objectCheck(newState);
    setState((prevState) =>
      isFunctionUpdate ? newState(prevState) : newState
    );
  };

  const merge = (newState = {}) => {
    const isFunctionUpdate = typeof newState === "function";
    if (!isFunctionUpdate) objectCheck(newState);
    setState((prevState) =>
      isFunctionUpdate
        ? mergeDeep(prevState, newState(prevState))
        : mergeDeep(prevState, newState)
    );
  };

  return [state, { set, merge }];
}

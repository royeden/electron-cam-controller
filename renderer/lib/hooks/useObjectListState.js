import { useState } from "react";
import {
  arrayCheck,
  insertArrayValue,
  mergeArrayValue,
  modifyArrayValue,
  removeArrayValue,
} from "../../utils/array";
import { curry } from "../../utils/fp";

import { objectCheck } from "../../utils/object";

export default function useObjectListState(initialState = []) {
  arrayCheck(initialState);
  if (initialState.length > 0) initialState.every(objectCheck);
  const [state, setState] = useState(initialState);

  const add = curry(function addStateItem(index, item) {
    objectCheck(item);
    setState((prevState) => insertArrayValue(prevState, index, item));
  });

  const remove = (index) =>
    setState((prevState) => removeArrayValue(prevState, index));

  const set = curry(function setStateItem(index, item) {
    objectCheck(item);
    setState((prevState) => modifyArrayValue(prevState, index, item));
  });

  const merge = curry(function setStateItem(index, item) {
    objectCheck(item);
    setState((prevState) => mergeArrayValue(prevState, index, item));
  });

  return [state, { add, remove, set, merge }];
}

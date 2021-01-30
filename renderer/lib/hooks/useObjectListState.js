import { useState } from "react";
import {
  check as arrayCheck,
  insert,
  merge as arrayMerge,
  modify,
  remove as arrayRemove,
} from "../../utils/array";
import { curry } from "../../utils/fp";

import { check as objectCheck } from "../../utils/object";

export default function useObjectListState(initialState = []) {
  arrayCheck(initialState);
  if (initialState.length > 0) initialState.every(objectCheck);
  const [state, setState] = useState(initialState);

  const add = curry(function addStateItem(index, item) {
    objectCheck(item);
    setState((prevState) => insert(prevState, index, item));
  });

  const remove = (index) =>
    setState((prevState) => arrayRemove(prevState, index));

  const set = curry(function setStateItem(index, item) {
    objectCheck(item);
    setState((prevState) => modify(prevState, index, item));
  });

  const merge = curry(function setStateItem(index, item) {
    objectCheck(item);
    setState((prevState) => arrayMerge(prevState, index, item));
  });

  return [state, { add, remove, set, merge }];
}

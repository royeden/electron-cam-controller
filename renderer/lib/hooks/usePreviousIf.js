import usePrevious from "./usePrevious";

export default function usePreviousIf(value, predicateOrValueIsEqualTo) {
  const previousValue = usePrevious(value);
  return typeof predicateOrValueIsEqualTo === "function"
    ? predicateOrValueIsEqualTo(value, previousValue)
    : value === predicateOrValueIsEqualTo
    ? previousValue
    : value;
}

export function defined(value) {
  return value !== undefined;
}

export function fallback(value, fallbackValue) {
  return defined(value) ? value : fallbackValue;
}

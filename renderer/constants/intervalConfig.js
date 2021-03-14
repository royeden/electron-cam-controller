export const INTERVAL_TYPES = {
  frame: "frame",
  idle: "idle",
  interval: "interval",
};

export const INTERVAL_VALUE_TYPES = {
  bpm: "bpm",
  fps: "fps",
  ms: "ms",
};

export const INTERVAL_VALUE_TYPES_DEFAULTS = {
  [INTERVAL_VALUE_TYPES.bpm]: 120,
  [INTERVAL_VALUE_TYPES.fps]: 30,
  [INTERVAL_VALUE_TYPES.ms]: 500,
};

export const INTERVAL_VALUE_TYPES_LIMITS = {
  [INTERVAL_VALUE_TYPES.bpm]: {
    max: 2000,
    min: 1,
  },
  [INTERVAL_VALUE_TYPES.fps]: {
    max: 60,
    min: 1,
  },
  [INTERVAL_VALUE_TYPES.ms]: {
    max: Number.MAX_SAFE_INTEGER, // this limit is needed for consistency
    min: 10,
  },
};

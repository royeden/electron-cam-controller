// THX <3 <3 <3
// https://github.com/franciscop/use-animation-frame/blob/master/index.js
import { useEffect, useMemo, useRef } from "react";
import { INTERVAL_TYPES } from "../../constants/intervalConfig";

// Reusable hook that also takes dependencies
export default function useAnimation(
  cb,
  type = INTERVAL_TYPES.frame,
  run = true,
  timeout = 1000
) {
  if (!Object.values(INTERVAL_TYPES).includes(type))
    throw new Error("Invalid animation interval type");
  
  const usesRequestAnimationFrame = useMemo(
    () => type === INTERVAL_TYPES.frame,
    [type]
  );
  const usesRequestIdleCallback = useMemo(() => type === INTERVAL_TYPES.idle, [
    type,
  ]);
  const usesSetInterval = useMemo(() => type === INTERVAL_TYPES.interval, [
    type,
  ]);

  const frame = useRef();

  const animate = () => {
    if (run) {
      cb();
      if (usesRequestAnimationFrame)
        frame.current = requestAnimationFrame(animate);
      if (usesRequestIdleCallback && timeout > 0)
        frame.current = requestIdleCallback(animate, { timeout });
    }
  };

  useEffect(() => {
    if (usesRequestAnimationFrame)
      frame.current = requestAnimationFrame(animate);
    if (usesRequestIdleCallback && timeout > 0)
      frame.current = requestIdleCallback(animate, { timeout });
    if (usesSetInterval && timeout > 0)
      frame.current = setInterval(animate, timeout);

    return () => {
      if (usesRequestAnimationFrame) cancelAnimationFrame(frame.current);
      if (usesRequestIdleCallback) cancelIdleCallback(frame.current);
      if (usesSetInterval) clearInterval(frame.current);
    };
  }, [
    run,
    timeout,
    usesRequestAnimationFrame,
    usesRequestIdleCallback,
    usesSetInterval,
  ]); // Make sure to change it if the deps change
}

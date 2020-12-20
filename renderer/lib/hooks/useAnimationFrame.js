// THX <3 <3 <3
// https://github.com/franciscop/use-animation-frame/blob/master/index.js
import { useEffect, useRef } from "react";

// Reusable component that also takes dependencies
export default function useAnimationFrame (cb, deps) {
  const frame = useRef();

  const animate = () => {
    cb();
    frame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current);
  }, deps); // Make sure to change it if the deps change
};

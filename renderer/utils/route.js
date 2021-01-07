import { idempotence } from "./fp";
import { map } from "./p5";

export function createRoute({
  constrain = true,
  enabled = true,
  route = "",
  transformer = idempotence,
  from = { min: 0, max: 1 },
  to = { min: 0, max: 1 },
}) {
  return {
    enabled,
    route,
    mapper: to,
    message(value) {
      return transformer(
        map(value, from.min, from.max, to.min, to.max, constrain)
      );
    },
  };
}

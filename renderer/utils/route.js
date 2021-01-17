import { BODY_PART, FROM_MAPPER, TO_MAPPER } from "../constants/posenet";
import { idempotence } from "./fp";
import { objectMap } from "./object";
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
    message(value) {
      return transformer(
        map(value, from.min, from.max, to.min, to.max, constrain)
      );
    },
  };
}

export function createDefaultRoute({ from, route, to }) {
  return {
    constrain: true,
    enabled: true,
    from,
    route,
    to,
  };
}

export function createFormRoute(route) {
  return objectMap(route, ({ route, to, ...rest }) => ({
    ...rest,
    route: route.split("/"),
    to: objectMap(to, String),
  }));
}

export function formRouteToRoute(route) {
  return objectMap(route, ({ route, to, ...rest }) => ({
    ...rest,
    route: route.join("/"),
    to: objectMap(to, Number),
  }));
}

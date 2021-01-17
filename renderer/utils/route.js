import { idempotence } from "./fp";
import { map } from "./p5";
import { objectMap } from "./object";

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

export function createFormRoute({ route: routes, to, ...rest }) {
  return {
    ...rest,
    route: routes.split("/"),
    to: objectMap(to, String),
  };
}

export function formRouteToRoute({ route, to, ...rest }) {
  return {
    ...rest,
    route: route.join("/"),
    to: objectMap(to, Number),
  };
}

export function createFormBodyPartRoute(route) {
  return objectMap(route, createFormRoute);
}

export function formBodyPartRouteToRoute(route) {
  return objectMap(route, formRouteToRoute);
}


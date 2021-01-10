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

export function createBodyPartRoute(bodyPart) {
  return {
    [BODY_PART.x]: {
      constrain: true,
      enabled: true,
      from: FROM_MAPPER[BODY_PART.x],
      route: `${bodyPart}/x`,
      to: TO_MAPPER[BODY_PART.x],
    },
    [BODY_PART.y]: {
      constrain: true,
      enabled: true,
      from: FROM_MAPPER[BODY_PART.y],
      route: `${bodyPart}/y`,
      to: TO_MAPPER[BODY_PART.y],
    },
    [BODY_PART.score]: {
      constrain: true,
      enabled: true,
      from: FROM_MAPPER[BODY_PART.score],
      route: `${bodyPart}/score`,
      to: TO_MAPPER[BODY_PART.score],
    },
  };
}

export function createFormRoute(route) {
  return objectMap(route, ({ route, to, ...rest }) => ({
    ...rest,
    route: route.split("/"),
    to: objectMap(to, String),
  }))
}

export function formRouteToRoute(route) {
  return objectMap(route, ({ route, to, ...rest }) => ({
    ...rest,
    route: route.join("/"),
    to: objectMap(to, Number),
  }))
}

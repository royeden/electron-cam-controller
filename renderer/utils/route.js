import { identity } from "./fp";
import { map } from "./p5";
import { map as objectMap, pick } from "./object";
import { BODY_PARTS } from "../constants/posenet";
import { BASE_ROUTES, ROUTE_PROPS } from "../constants/routes";
import { validateBodyPart } from "./bodyParts";

export function createRoute({
  constrain = true,
  enabled = true,
  route = "",
  transformer = identity,
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

export function createDefaultRoute({ route, to }) {
  return {
    constrain: true,
    enabled: true,
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

/**
 * Determines if a route is valid
 * @param {Object} route Route object
 * @param {boolean} route.constrain constrain mapped value within limits?
 * @param {boolean} route.enabled send messages to route?
 * @param {string} route.route OSC route
 * @param {Object} route.to Mapper
 * @param {number} route.to.max
 * @param {number} route.to.min
 * @returns {boolean}
 */

export function validateRoute(route) {
  return (
    Object.values(ROUTE_PROPS).every((prop) => route.hasOwnProperty(prop)) &&
    typeof route.constrain === "boolean" &&
    typeof route.enabled === "boolean" &&
    typeof route.route === "string" &&
    typeof route.to === "object" &&
    route.to.hasOwnProperty("max") &&
    route.to.hasOwnProperty("min") &&
    typeof route.to.max === "number" &&
    typeof route.to.min === "number"
  );
}

export function validateRoutes(routes) {
  const bodyPartRoutes = pick(Object.values(BODY_PARTS), routes);
  const baseRoutes = pick(Object.values(BASE_ROUTES), routes);
  return (
    Object.values(bodyPartRoutes).every((subroutes) =>
      subroutes.every(validateBodyPart)
    ) &&
    Object.values(baseRoutes).every((subroutes) =>
      subroutes.every(validateRoute)
    )
  );
}

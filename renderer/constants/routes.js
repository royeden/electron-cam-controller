import { createDefaultRoute } from "../utils/route";

export const BASE_ROUTES = {
  score: "score",
  rgb: "rgb",
};

export const ROUTE_PROPS = {
  constrain: 'constrain',
  enabled: 'enabled',
  route: 'route',
  // transformer: 'transformer',
  to: 'to',
}

export const MAPPER_PROPS = {
  max: "max",
  min: "min"
}

export const ROUTES_FROM_MAPPER = {
  [BASE_ROUTES.score]: { min: 0, max: 1 },
  [BASE_ROUTES.rgb]: { min: 0, max: 255 },
};

export const ROUTES_TO_MAPPER = {
  [BASE_ROUTES.rgb]: { min: 0, max: 1000 },
  [BASE_ROUTES.score]: { min: 0, max: 1 },
};

export function createBaseRoute(route = "") {
  return createDefaultRoute({
    route,
    to: ROUTES_TO_MAPPER[route],
  });
}

export const ROUTES = {
  [BASE_ROUTES.score]: [createBaseRoute(BASE_ROUTES.score)],
  [BASE_ROUTES.rgb]: [createBaseRoute(BASE_ROUTES.rgb)],
};

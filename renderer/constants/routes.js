import { createDefaultRoute } from "../utils/route";

export const BASE_ROUTES = {
  score: "score",
  rgb: "rgb",
};

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
    from: ROUTES_FROM_MAPPER[route],
    route,
    to: ROUTES_TO_MAPPER[route],
  });
}

export const ROUTES = {
  [BASE_ROUTES.score]: [createBaseRoute(BASE_ROUTES.score)],
  [BASE_ROUTES.rgb]: [createBaseRoute(BASE_ROUTES.rgb)],
};

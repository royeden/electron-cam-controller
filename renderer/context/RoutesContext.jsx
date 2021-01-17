import { createContext, useState } from "react";
import { BODY_PARTS_ROUTES } from "../constants/posenet";
import { ROUTES } from "../constants/routes";
import useObjectState from "../lib/hooks/useObjectState";

const initialContext = {
  routes: { ...BODY_PARTS_ROUTES, ...ROUTES },
  setRoutes(routes = {}) {},
  mergeRoutes(routes = {}) {},
  editingRoute: "",
  setEditingRoute(route = "") {},
};

export const RoutesContext = createContext(initialContext);

const { Provider } = RoutesContext;

export default function RoutesProvider({ children }) {
  const [editingRoute, setEditingRoute] = useState(initialContext.editingRoute);
  const [routes, { set: setRoutes, merge: mergeRoutes }] = useObjectState(
    initialContext.routes
  );
  return (
    <Provider
      value={{
        routes,
        setRoutes,
        mergeRoutes,
        editingRoute,
        setEditingRoute,
      }}
    >
      {children}
    </Provider>
  );
}

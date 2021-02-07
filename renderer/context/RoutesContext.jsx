import toast from "react-hot-toast";
import { createContext, useEffect, useState } from "react";

import CONFIG_EVENTS from "../../main/events/config";
import useObjectState from "../lib/hooks/useObjectState";
import useToggle from "../lib/hooks/useToggle";
import { BODY_PARTS_ROUTES } from "../constants/posenet";
import { ROUTES } from "../constants/routes";
import { validateRoutes } from "../utils/route";

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
  useEffect(() => {
    if (process.browser) {
      window.ipcRenderer.on(CONFIG_EVENTS.import_start, () => {
        const config = window.ipcRenderer.sendSync(
          CONFIG_EVENTS.import_request
        );
        if (config) {
          try {
            const parsedConfig = JSON.parse(config);
            // TODO add toasts
            if (validateRoutes(parsedConfig)) {
              setRoutes(parsedConfig);
              // TODO add i18n
              toast.success("Config imported!");
            } else throw new Error("Invalid config!");
          } catch (error) {
            toast.error(error.message);
          }
        }
        window.ipcRenderer.send(
          CONFIG_EVENTS.import_reset
        );
      });
      window.ipcRenderer.on(CONFIG_EVENTS.export_start, () => {
        try {
          const path = window.ipcRenderer.sendSync(CONFIG_EVENTS.export_request, routes);
          if (path) toast.success(`Config exported to ${path}!`);
        } catch (error) {
          toast.error(error.message);
        }
        window.ipcRenderer.send(
          CONFIG_EVENTS.export_reset
        );
      });
    }
  }, []);

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

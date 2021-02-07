import { classnames } from "tailwindcss-classnames";

import IconButton from "../UI/IconButton";
import useObjectState from "../../lib/hooks/useObjectState";
import useTranslation from "../../lib/hooks/useTranslation";

import RouteInput from "./RouteInput";

export default function RouteConfig({
  editingRoute,
  isBodyPart,
  onBack,
  onSave,
  routes,
}) {
  const { t } = useTranslation();
  const [routesState, { set, merge }] = useObjectState(routes);
  // TODO add undo/redo
  // const [form, { add, merge, remove, set }] = useObjectListState(initialValue);
  const routeKey = `${editingRoute}-route`;
  const routeKeys = isBodyPart && Object.keys(routes);
  const reset = () => set(routes);
  const save = (event) => {
    event.preventDefault();
    onSave(routesState);
    onBack();
  };

  return (
    <div className="relative flex w-full p-4 mb-4 border rounded-md border-light-medium">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <IconButton
          button={{
            className: "h-6 w-6",
          }}
          onClick={save}
          title={t("bodyControls.route.save")}
          type="save"
        />
        <IconButton
          button={{
            className: "h-6 w-6",
          }}
          onClick={reset}
          title={t("bodyControls.route.reset")}
          type="reset"
        />
      </div>
      <div className="w-full h-full">
        {isBodyPart ? (
          routeKeys.map((route, routeIndex) => (
            <div
              key={`${routeKey}-${route}`}
              className={classnames({
                [classnames("border-b-2", "border-light-medium")]:
                  routeIndex + 1 < routeKeys.length,
              })}
            >
              <form onSubmit={save}>
                <RouteInput
                  enabled={routesState[route].enabled}
                  onChange={(payload) => merge({ [route]: payload })}
                  route={route}
                  routeKey={routeKey}
                  routes={routesState[route].route}
                  to={routesState[route].to}
                />
              </form>
            </div>
          ))
        ) : (
          <RouteInput
            enabled={routesState.enabled}
            onChange={merge}
            route={editingRoute}
            routeKey={routeKey}
            routes={routesState.route}
            to={routesState.to}
          />
        )}
      </div>
    </div>
  );
}

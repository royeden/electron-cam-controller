import { useCallback, useContext, useMemo } from "react";
import { classnames } from "tailwindcss-classnames";

import Button from "../UI/Button";
import Modal from "../UI/Modal";
import useObjectListState from "../../lib/hooks/useObjectListState";
import usePreviousIf from "../../lib/hooks/usePreviousIf";
import useTranslation from "../../lib/hooks/useTranslation";
import { RoutesContext } from "../../context/RoutesContext";
import { BODY_PARTS, createBodyPartRoute } from "../../constants/posenet";
import {
  createFormBodyPartRoute,
  createFormRoute,
  formBodyPartRouteToRoute,
  formRouteToRoute,
} from "../../utils/route";
import { curry } from "../../utils/fp";

import RouteInput from "./RouteInput";
import { createBaseRoute } from "../../constants/routes";

const bodyParts = Object.keys(BODY_PARTS);

export default function RoutesModal() {
  const { t } = useTranslation();
  const { editingRoute, mergeRoutes, routes, setEditingRoute } = useContext(
    RoutesContext
  );
  const isBodyPart = useMemo(() => bodyParts.includes(editingRoute), [
    editingRoute,
  ]);

  const header = usePreviousIf(editingRoute, "");

  const initialValue = useMemo(
    () =>
      editingRoute
        ? routes[editingRoute].map(
            isBodyPart ? createFormBodyPartRoute : createFormRoute
          )
        : [],
    [editingRoute, routes]
  );

  const [form, { add, merge, remove, set }] = useObjectListState(initialValue);

  const handleAddRoute = useCallback(
    (index) => () =>
      add(
        index + 1,
        isBodyPart
          ? createFormBodyPartRoute(createBodyPartRoute(editingRoute))
          : createFormRoute(createBaseRoute(editingRoute))
      ),
    [editingRoute, isBodyPart]
  );

  const handleCopyRoute = useCallback(
    (index, routes) => () => add(index + 1, JSON.parse(JSON.stringify(routes))),
    [routes]
  );

  // Quickest way to apply a deep comparison of objects, we take advantage of the serializable* values that we are using
  // *We know these values are serializable because we are be able to export them to JSON files to keep our configuration
  const hasChanged = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(initialValue),
    [initialValue, form]
  );

  const reset = () => set(initialValue);

  const changeRoute = useCallback(
    curry(function (index, payload) {
      merge(index, payload);
    }),
    []
  );

  const changeSubroute = useCallback(
    curry(function (index, route, payload) {
      merge(index, {
        [route]: payload,
      });
    }),
    []
  );

  const handleSubmit = () => {
    mergeRoutes({
      [editingRoute]: form.map(
        isBodyPart ? formBodyPartRouteToRoute : formRouteToRoute
      ),
    });
    setEditingRoute("");
    reset();
  };

  return (
    <Modal
      contentLabel={t(`routes.${editingRoute}`)}
      className="w-2/3 max-w-full p-8 mx-6 overflow-hidden lg:w-1/2 h-2/3 min-w-min"
      visible={Boolean(editingRoute)}
      onRequestClose={() => setEditingRoute("")}
    >
      <div className="flex flex-col h-full">
        <h1 className="text-xl font-bold tracking-wide">
          {t(`routes.${header}`)}
        </h1>
        <p>Changed: {`${hasChanged}`}</p>
        <div className="h-full pt-2 pr-4 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-DEFAULT">
          {form.length > 0 ? (
            form.map((routes, index) => {
              const routeKey = `${editingRoute}-route-${index}`;
              const routeKeys = isBodyPart && Object.keys(routes);
              return (
                <div
                  key={routeKey}
                  className="flex flex-col p-4 mb-4 border-2 rounded-md border-light-medium"
                >
                  <div>
                    <Button onClick={handleAddRoute(index)}>
                      {t("bodyControls.route.add")}
                    </Button>
                    <Button onClick={handleCopyRoute(index, routes)}>Copy route</Button>
                    <Button onClick={() => remove(index)}>
                      {t("bodyControls.route.delete")}
                    </Button>
                  </div>
                  {isBodyPart ? (
                    routeKeys.map((route, routeIndex) => (
                      <div
                        key={`${routeKey}-${route}`}
                        className={classnames({
                          [classnames("border-b-2", "border-light-medium")]:
                            routeIndex + 1 < routeKeys.length,
                        })}
                      >
                        <RouteInput
                          enabled={routes[route].enabled}
                          onChange={changeSubroute(index, route)}
                          route={route}
                          routeKey={routeKey}
                          routes={routes[route].route}
                          to={routes[route].to}
                        />
                      </div>
                    ))
                  ) : (
                    <RouteInput
                      enabled={routes.enabled}
                      onChange={changeRoute(index)}
                      route={editingRoute}
                      routeKey={routeKey}
                      routes={routes.route}
                      to={routes.to}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <Button onClick={handleAddRoute(0)}>
              {t("bodyControls.route.add")}
            </Button>
          )}
        </div>
        <div className="flex justify-center w-full mt-4">
          <Button onClick={handleSubmit}>{t("bodyControls.form.save")}</Button>
        </div>
      </div>
    </Modal>
  );
}

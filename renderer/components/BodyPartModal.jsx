import { useCallback, useContext, useMemo } from "react";
import { classnames } from "tailwindcss-classnames";

import { BodyPartsContext } from "../context/BodyPartsContext";
import useObjectListState from "../lib/hooks/useObjectListState";
import usePreviousIf from "../lib/hooks/usePreviousIf";
import useTranslation from "../lib/hooks/useTranslation";
import { curry } from "../utils/fp";
import {
  createBodyPartRoute,
  createFormRoute,
  formRouteToRoute,
} from "../utils/route";
import Button from "./Button";

import Modal from "./Modal";
import RouteInput from "./RouteInput";

export default function BodyPartModal() {
  const { t } = useTranslation();
  const { bodyParts, editingPart, setEditingPart, mergeBodyParts } = useContext(
    BodyPartsContext
  );
  const header = usePreviousIf(editingPart, "");
  const initialValue = useMemo(
    () => (editingPart ? bodyParts[editingPart].map(createFormRoute) : []),
    [bodyParts, editingPart]
  );

  const [form, { add, merge, remove, set }] = useObjectListState(initialValue);

  // Quickest way to apply a deep comparison of objects, we take advantage of the serializable* values that we are using
  // *We know these values are serializable because we are be able to export them to JSON files to keep our configuration
  const hasChanged = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(initialValue),
    [initialValue, form]
  );

  const reset = () => set(initialValue);

  const changeSubroute = useCallback(
    curry(function (index, route, payload) {
      merge(index, {
        [route]: payload,
      });
    }),
    [form]
  );

  const handleSubmit = () => {
    mergeBodyParts({ [editingPart]: form.map(formRouteToRoute) });
    setEditingPart("");
    reset();
  };

  return (
    <Modal
      contentLabel={t(`bodyParts.${editingPart}`)}
      className="w-2/3 max-w-full p-8 mx-6 overflow-hidden lg:w-1/2 h-2/3 min-w-min"
      visible={Boolean(editingPart)}
      onRequestClose={() => setEditingPart("")}
    >
      <div className="flex flex-col h-full">
        <h1 className="text-xl font-bold tracking-wide">
          {t(`bodyParts.${header}`)}
        </h1>
        <p>Changed: {`${hasChanged}`}</p>
        <div className="h-full pt-2 pr-4 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-DEFAULT">
          {form.length > 0 ? (
            form.map((routes, index) => {
              const routeKey = `${editingPart}-route-${index}`;
              const routeKeys = Object.keys(routes);
              return (
                <div
                  key={routeKey}
                  className="flex flex-col p-4 mb-4 border-2 rounded-md border-light-medium"
                >
                  <div>
                    <Button
                      onClick={() =>
                        add(
                          index + 1,
                          createFormRoute(createBodyPartRoute(editingPart))
                        )
                      }
                    >
                      {t("bodyControls.route.add")}
                    </Button>
                    <Button
                      onClick={() =>
                        add(index + 1, JSON.parse(JSON.stringify(routes)))
                      }
                    >
                      Copy route
                    </Button>
                    <Button onClick={() => remove(index)}>
                      {t("bodyControls.route.delete")}
                    </Button>
                  </div>
                  {routeKeys.map((route, routeIndex) => (
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
                  ))}
                </div>
              );
            })
          ) : (
            <Button
              onClick={() =>
                add(0, createFormRoute(createBodyPartRoute(editingPart)))
              }
            >
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

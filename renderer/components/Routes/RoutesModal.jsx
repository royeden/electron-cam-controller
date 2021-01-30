import { CSSTransition, SwitchTransition } from "react-transition-group";
import { classnames } from "tailwindcss-classnames";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Button from "../UI/Button";
import Modal from "../UI/Modal";
import useObjectListState from "../../lib/hooks/useObjectListState";
import usePreviousIf from "../../lib/hooks/usePreviousIf";
import useTranslation from "../../lib/hooks/useTranslation";
import { BODY_PARTS, createBodyPartRoute } from "../../constants/posenet";
import { RoutesContext } from "../../context/RoutesContext";
import { createBaseRoute } from "../../constants/routes";
import {
  createFormBodyPartRoute,
  createFormRoute,
  formBodyPartRouteToRoute,
  formRouteToRoute,
} from "../../utils/route";
import { defined, fallback } from "../../utils/validation";

import RouteConfig from "./RouteConfig";
import Routes from "./Routes";

const bodyParts = Object.keys(BODY_PARTS);

const opacityTransition = classnames(
  "duration-300",
  "ease-in-out",
  "transition-opacity"
);
const hide = classnames(opacityTransition, "opacity-0");
const show = classnames(opacityTransition, "opacity-100");

export default function RoutesModal() {
  const { t } = useTranslation();
  const { editingRoute, mergeRoutes, routes, setEditingRoute } = useContext(
    RoutesContext
  );

  const cachedRoute = usePreviousIf(editingRoute, "");

  const isBodyPart = useMemo(() => bodyParts.includes(cachedRoute), [
    cachedRoute,
  ]);

  const [editingIndex, setEditingIndex] = useState(undefined);

  const initialValue = useMemo(
    () =>
      cachedRoute
        ? routes[cachedRoute].map((value, id) => {
            const mapper = isBodyPart
              ? createFormBodyPartRoute
              : createFormRoute;
            return {
              ...mapper(value),
              id,
            };
          })
        : [],
    [cachedRoute, routes]
  );

  const lastId = useRef(0);

  useEffect(() => {
    if (editingRoute !== cachedRoute) {
      lastId.current = initialValue.length;
    }
  }, [editingRoute]);

  const [form, { add, merge, remove, set }] = useObjectListState(initialValue);

  const handleAddRoute = useCallback(
    (index) => () => {
      const payload = isBodyPart
        ? createFormBodyPartRoute(createBodyPartRoute(editingRoute))
        : createFormRoute(createBaseRoute(editingRoute));
      add(index + 1, { ...payload, id: ++lastId.current });
    },
    [editingRoute, isBodyPart]
  );

  const handleCopyRoute = useCallback(
    (index, routes) => () => {
      const payload = {
        ...JSON.parse(JSON.stringify(routes)),
        id: ++lastId.current,
      };
      add(index + 1, payload);
    },
    [routes]
  );

  const handleEditRoute = useCallback(
    (index) => () => setEditingIndex(index),
    []
  );

  const handleRemoveRoute = useCallback((index) => () => remove(index), []);

  // Quickest way to apply a deep comparison of objects, we take advantage of the serializable* values that we are using
  // *We know these values are serializable because we are be able to export them to JSON files to keep our configuration
  const hasChanged = useMemo(
    () =>
      JSON.stringify(form.map(({ id, ...value }) => value)) !==
      JSON.stringify(initialValue.map(({ id, ...value }) => value)),
    [initialValue, form]
  );

  const reset = () => set(initialValue);

  const handleChange = useCallback((payload) => merge(editingIndex, payload), [
    editingIndex,
  ]);

  const handleSubmit = () => {
    mergeRoutes({
      [editingRoute]: form.map(({ id, ...value }) => {
        const mapper = isBodyPart ? formBodyPartRouteToRoute : formRouteToRoute;
        return mapper(value);
      }),
    });
    setEditingRoute("");
    reset();
  };

  return (
    <Modal
      className="w-2/3 max-w-full p-8 mx-6 overflow-hidden lg:w-1/2 h-4/5 min-w-min"
      contentLabel={t(`routes.${editingRoute}`)}
      onRequestClose={() => setEditingRoute("")}
      visible={Boolean(editingRoute)}
    >
      <div className="flex flex-col h-full">
        <h1 className="text-xl font-bold tracking-wide">
          {t(`routes.${cachedRoute}`)}
        </h1>
        <SwitchTransition>
          <CSSTransition
            key={`${fallback(editingIndex, "route")}`}
            classNames={{
              appear: hide,
              appearActive: hide,
              appearDone: show,
              enter: hide,
              enterActive: hide,
              enterDone: show,
              exit: hide,
              exitActive: hide,
              exitDone: show,
            }}
            in={!defined(editingIndex)}
            timeout={300}
          >
            <div className="h-full pt-2 pr-4 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-DEFAULT">
              {defined(editingIndex) ? (
                <RouteConfig
                  editingRoute={editingRoute}
                  isBodyPart={isBodyPart}
                  onBack={() => setEditingIndex(undefined)}
                  onSave={handleChange}
                  routes={form[editingIndex]}
                />
              ) : (
                <Routes
                  editingRoute={editingRoute}
                  form={form}
                  isBodyPart={isBodyPart}
                  onAdd={handleAddRoute}
                  onEdit={handleEditRoute}
                  onCopy={handleCopyRoute}
                  onRemove={handleRemoveRoute}
                />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
        <div className="flex justify-center w-full mt-4">
          {hasChanged && (
            <Button onClick={handleSubmit}>
              {t("bodyControls.form.save")}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

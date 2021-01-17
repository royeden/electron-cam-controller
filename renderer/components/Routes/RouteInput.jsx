import Tippy from "@tippyjs/react";
import { classnames } from "tailwindcss-classnames";
import { useCallback, useMemo } from "react";

import Icon from "../UI/Icon";
import Input from "../UI/Input";
import Toggle from "../UI/Toggle";
import useTranslation from "../../lib/hooks/useTranslation";
import {
  insertArrayValue,
  modifyArrayValue,
  removeArrayValue,
} from "../../utils/array";
import { curry } from "../../utils/fp";

const buttonInteractions = classnames("hover:border-light", "hover:text-light");

const buttonClass = classnames(
  "p-1",
  "mx-2",
  "transition-colors",
  "duration-300",
  "border-2",
  "rounded-full",
  "border-light-medium",
  "text-light-medium",
  "outline-none",
  "focus:border-light",
  "focus:outline-none",
  "focus:text-light"
);

export default function RouteInput({
  enabled = true,
  onChange,
  route = "",
  routeKey = "",
  routes = [],
  to = {},
}) {
  const { t } = useTranslation();

  const valid = useMemo(
    () => routes.every(Boolean) && Object.values(to).every(Boolean),
    [routes, to]
  );

  const handleAddRoute = useCallback(
    (index) => onChange({ route: insertArrayValue(routes, index + 1, "") }),
    [routes]
  );

  const handleChangeRoute = useCallback(
    curry(function changeRoute(index, event) {
      onChange({ route: modifyArrayValue(routes, index, event.target.value) });
    }),
    [routes]
  );

  const handleDeleteRoute = useCallback(
    (index) => onChange({ route: removeArrayValue(routes, index) }),
    [routes]
  );

  const handleChangeMapper = useCallback(
    curry(function changeMapper(key, event) {
      onChange({ to: { [key]: event.target.value } });
    }),
    []
  );

  const handleChangeEnabled = useCallback(
    () => onChange({ enabled: !enabled }),
    [enabled]
  );

  return (
    <div className="my-8">
      <h3>{route.toUpperCase()}</h3>
      <div className="flex flex-wrap items-center w-full">
        {routes.map((subroute, index) => (
          <div
            className="flex items-center my-2"
            key={`${routeKey}-${route}-subroute-${index}`}
          >
            <span>/</span>
            {index > 0 && (
              <Tippy
                animation="shift-away"
                arrow
                content={t("bodyControls.subroute.delete")}
                placement="top"
              >
                <button
                  aria-label={t("bodyControls.subroute.delete")}
                  className={classnames(buttonClass, buttonInteractions)}
                  onClick={() => handleDeleteRoute(index)}
                  title={t("bodyControls.subroute.delete")}
                  type="button"
                >
                  <Icon type="close" />
                </button>
              </Tippy>
            )}
            <Input
              error={!subroute}
              onChange={handleChangeRoute(index)}
              value={subroute}
            />
            <Tippy
              animation="shift-away"
              arrow
              content={t("bodyControls.subroute.add")}
              placement="top"
            >
              <button
                aria-label={t("bodyControls.subroute.add")}
                className={classnames(buttonClass, {
                  "cursor-not-allowed": !valid,
                  [buttonInteractions]: valid,
                })}
                disabled={!valid}
                onClick={() => handleAddRoute(index)}
                title={t("bodyControls.subroute.add")}
                type="button"
              >
                <Icon type="add" />
              </button>
            </Tippy>
          </div>
        ))}
      </div>
      <div className="flex items-center w-full">
        <h4>Mapper:</h4>
        {Object.keys(to).map((key) => (
          <Input
            key={`${routeKey}-to-${key}`}
            className={classnames("mr-2", "my-4")}
            error={to[key] === ""}
            onChange={handleChangeMapper(key)}
            type="number"
            value={to[key]}
          />
        ))}
      </div>
      <Toggle checked={enabled} onChange={handleChangeEnabled}>
        Enabled
      </Toggle>
    </div>
  );
}

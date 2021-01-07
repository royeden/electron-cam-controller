import Tippy from "@tippyjs/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { classnames } from "tailwindcss-classnames";
import useObjectState from "../lib/hooks/useObjectState";
import { objectMap } from "../utils/object";
import Button from "./Button";

import Icon from "./Icon";
import Input from "./Input";

const buttonInteractions = classnames(
  "hover:border-light",
  "focus:border-light",
  "hover:text-light",
  "focus:text-light"
);

const buttonClass = classnames(
  "p-1",
  "mx-2",
  "transition-colors",
  "duration-300",
  "border-2",
  "rounded-full",
  "border-light-medium",
  "text-light-medium",
  "outline-none"
);

// TODO move this state up into a form and add save logic
export default function RouteInput({
  label = "",
  mapper,
  part = "",
  onChange,
  route = "",
}) {
  // const { t } = useTranslation();
  const [internalMapper, , mergeInternalMapper] = useObjectState(
    objectMap(mapper, String)
  );
  const [subroutes, setSubroutes] = useState(route.split("/"));

  const valid =
    subroutes.every(Boolean) && Object.values(internalMapper).every(Boolean);

  const submit = () => {
    if (valid)
      onChange({
        route: subroutes.join("/"),
        to: objectMap(internalMapper, Number),
      });
  }

  const handleAddRoute = useCallback(
    (index) => () =>
      setSubroutes((prevState) => {
        const newState = [...prevState];
        newState.splice(index + 1, 0, "");
        return newState;
      }),
    []
  );

  const handleChangeRoute = useCallback(
    (index) => (event) =>
      setSubroutes((prevState) =>
        Object.assign([], prevState, { [index]: event.target.value })
      ),
    []
  );
  const handleChangeMapper = useCallback(
    (key) => (event) => mergeInternalMapper({ [key]: event.target.value }),
    []
  );

  const handleDeleteRoute = useCallback(
    (index) => () =>
      setSubroutes((prevState) => prevState.filter((_, i) => i !== index)),
    []
  );

  return (
    <>
      <h3>{label}</h3>
      <div className="flex items-center w-full">
        {subroutes.map((subroute, index) => (
          <div key={`subroute-${label.toLowerCase()}-${part}-${index}`}>
            <span>/</span>
            {index > 0 && (
              <Tippy
                animation="shift-away"
                arrow
                content="Delete subroute"
                placement="top"
              >
                <button
                  aria-label="Delete subroute"
                  className={classnames(buttonClass, buttonInteractions)}
                  onClick={handleDeleteRoute(index)}
                  title="Delete subroute"
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
              content="Add subroute"
              placement="top"
            >
              <button
                aria-label="Add subroute"
                className={classnames(buttonClass, {
                  "cursor-not-allowed": !valid,
                  [buttonInteractions]: valid,
                })}
                disabled={!valid}
                onClick={handleAddRoute(index)}
                title="Add subroute"
              >
                <Icon type="add" />
              </button>
            </Tippy>
          </div>
        ))}
      </div>
      <div className="flex items-center w-full">
        <Input
          className={classnames("mr-2", "my-4")}
          error={internalMapper.min === ""}
          onChange={handleChangeMapper("min")}
          type="number"
          value={internalMapper.min}
        />
        <Input
          error={internalMapper.max === ""}
          onChange={handleChangeMapper("max")}
          value={internalMapper.max}
          type="number"
        />
      </div>
      <Button disabled={!valid} onClick={submit}>Save</Button>
    </>
  );
}

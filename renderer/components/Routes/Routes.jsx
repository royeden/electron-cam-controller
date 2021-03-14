import { CSSTransition, TransitionGroup } from "react-transition-group";
import { classnames } from "tailwindcss-classnames";

import IconButton from "../UI/IconButton";
import useTranslation from "../../lib/hooks/useTranslation";

import RouteDisplay from "./RouteDisplay";

const opacityTransition = classnames(
  "duration-300",
  "ease-in-out",
  "transition-opacity",
);
const hide = classnames(opacityTransition, "opacity-0");
const show = classnames(opacityTransition, "opacity-100");

export default function Routes({
  editingRoute,
  form,
  isBodyPart,
  onAdd,
  onCopy,
  onEdit,
  onRemove,
}) {
  const { t } = useTranslation();
  return (
    <>
      <TransitionGroup enter={false} component={null}>
        {form.length > 0 &&
          form.map(({ id, ...routes }, index) => {
            const routeKey = `${editingRoute}-route-${id}`;
            const routeKeys = isBodyPart && Object.keys(routes);
            return (
              <CSSTransition
                key={routeKey}
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
                timeout={300}
              >
                <div className="relative flex w-full p-4 mb-4 border rounded-md border-light-medium">
                  <div className="absolute top-0 right-0 mt-4 mr-4">
                    <IconButton
                      button={{
                        className: "h-6 w-6",
                      }}
                      onClick={onEdit(index)}
                      title={t("bodyControls.route.edit")}
                      type="edit"
                    />
                    <IconButton
                      button={{
                        className: "h-6 w-6",
                      }}
                      onClick={onCopy(index, routes)}
                      title={t("bodyControls.route.copy")}
                      type="copy"
                    />
                    <IconButton
                      button={{
                        className: "h-6 w-6",
                      }}
                      onClick={onRemove(index)}
                      title={t("bodyControls.route.delete")}
                      type="delete"
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
                          <RouteDisplay
                            enabled={routes[route].enabled}
                            route={route}
                            routeKey={routeKey}
                            routes={routes[route].route}
                            to={routes[route].to}
                          />
                        </div>
                      ))
                    ) : (
                      <RouteDisplay
                        enabled={routes.enabled}
                        route={editingRoute}
                        routeKey={routeKey}
                        routes={routes.route}
                        to={routes.to}
                      />
                    )}
                  </div>
                </div>
              </CSSTransition>
            );
          })}
      </TransitionGroup>
      <div className="flex justify-center w-full ml-2">
        <IconButton
          button={{
            className: "h-6 w-6",
          }}
          onClick={onAdd(form.length)}
          title={t("bodyControls.route.add")}
          type="add-circle"
        />
      </div>
    </>
  );
}

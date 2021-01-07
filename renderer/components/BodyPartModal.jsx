import { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FROM_MAPPER } from "../constants/posenet";

import { BodyPartsContext } from "../context/BodyPartsContext";
import { createRoute } from "../utils/route";

import Modal from "./Modal";
import RouteInput from "./RouteInput";

export default function BodyPartModal() {
  const { bodyParts, editingPart, setEditingPart, mergeBodyParts } = useContext(
    BodyPartsContext
  );
  const bodyPart = useMemo(
    () => (editingPart ? bodyParts[editingPart] : null),
    [bodyParts, editingPart]
  );

  const handleChange = useCallback(
    (index, subroute) => (values) => {
      const routes = [...bodyPart.routes];
      routes[index] = {
        ...routes[index],
        [subroute]: createRoute({ ...values, from: FROM_MAPPER[subroute] }),
      };
      mergeBodyParts({ [editingPart]: { routes } });
    },
    [bodyPart, editingPart]
  );

  const { t } = useTranslation();
  return (
    <Modal
      contentLabel={t(`bodyParts.${editingPart}`)}
      className="w-1/3 max-w-full p-8 mx-6 overflow-x-hidden overflow-y-auto min-w-max h-2/3"
      visible={Boolean(editingPart)}
      onRequestClose={() => setEditingPart("")}
    >
      <h1
        className={`${
          editingPart ? "opacity-100" : "opacity-0"
        } text-xl font-bold tracking-wide`}
      >
        {t(`bodyParts.${editingPart}`)}
      </h1>
      {bodyPart &&
        bodyPart.routes.map(({ score, x, y, mapper }, index) => (
          <div key={`route-${index}`}>
            <RouteInput
              mapper={score.mapper}
              label="Score"
              part={editingPart}
              onChange={handleChange(index, "score")}
              route={score.route}
            />
            <RouteInput
              mapper={x.mapper}
              label="X"
              part={editingPart}
              onChange={handleChange(index, "x")}
              route={x.route}
            />
            <RouteInput
              mapper={y.mapper}
              label="Y"
              part={editingPart}
              onChange={handleChange(index, "y")}
              route={y.route}
            />
          </div>
        ))}
    </Modal>
  );
}

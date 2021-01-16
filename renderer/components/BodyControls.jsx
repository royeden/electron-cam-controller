import Tippy from "@tippyjs/react";
import { useContext } from "react";

import { BODY_PARTS } from "../constants/posenet";
import { BodyPartsContext } from "../context/BodyPartsContext";
import Skeleton from "./Skeleton";
import useTranslation from "../lib/hooks/useTranslation";

function EditBodyPart({
  bodyPart,
  className = "",
  onClick,
  placement = "top",
}) {
  const { t } = useTranslation();
  return (
    <div className={`${className} h-full w-full`}>
      <Tippy
        animation="shift-away"
        arrow
        className="w-full h-full outline-none focus:outline-none"
        content={t(`bodyParts.${bodyPart}`)}
        placement={placement}
      >
        <button
          className="w-2 h-2 transition-all duration-300 ease-in-out transform scale-150 rounded-full outline-none focus:outline-none hover:bg-pallete-complimentary focus:bg-pallete-complimentary hover:scale-225 focus:scale-225 bg-pallete-triadic2"
          onClick={() => onClick(bodyPart)}
        ></button>
      </Tippy>
    </div>
  );
}

const EDIT_BODY_PART_PROPS = {
  [BODY_PARTS.leftEar]: {
    className: "self-end col-start-10 row-start-1 -mb-1",
    placement: "left",
  },
  [BODY_PARTS.leftEye]: {
    className: "self-end col-start-11 row-start-1 -mb-0.5",
    placement: "top-end",
  },
  [BODY_PARTS.nose]: {
    className: "self-end col-start-12 row-start-1 -mb-1",
    placement: "top",
  },
  [BODY_PARTS.rightEye]: {
    className: "self-end col-start-13 row-start-1 -mb-0.5",
    placement: "top-start",
  },
  [BODY_PARTS.rightEar]: {
    className: "self-end row-start-1 -mb-1 col-start-14",
    placement: "right",
  },
  [BODY_PARTS.leftShoulder]: {
    className: "self-end col-start-7 row-start-4",
    placement: "top-end",
  },
  [BODY_PARTS.rightShoulder]: {
    className: "self-end row-start-4 col-start-17",
    placement: "top-start",
  },
  [BODY_PARTS.leftElbow]: {
    className: "self-end col-start-6 -mb-2 -ml-1 row-start-8",
    placement: "left",
  },
  [BODY_PARTS.rightElbow]: {
    className: "self-end ml-1 -mb-2 row-start-8 col-start-18",
    placement: "right",
  },
  [BODY_PARTS.leftWrist]: {
    className: "self-start col-start-3 ml-0.5 -mt-1 row-start-12",
    placement: "left-end",
  },
  [BODY_PARTS.rightWrist]: {
    className: "self-start -ml-0.5 -mt-1 row-start-12 col-start-21",
    placement: "right-end",
  },
  [BODY_PARTS.leftHip]: {
    className: "self-start col-start-8 mt-2 row-start-11",
    placement: "bottom-end",
  },
  [BODY_PARTS.rightHip]: {
    className: "self-start mt-2 row-start-11 col-start-16",
    placement: "bottom-start",
  },
  [BODY_PARTS.leftKnee]: {
    className: "self-end col-start-10 -mb-1 row-start-17",
    placement: "left-end",
  },
  [BODY_PARTS.rightKnee]: {
    className: "self-end -mb-1 row-start-17 col-start-14",
    placement: "right-end",
  },
  [BODY_PARTS.leftAnkle]: {
    className: "self-start col-start-11 mt-3 -ml-0.5 row-start-22",
    placement: "left-end",
  },
  [BODY_PARTS.rightAnkle]: {
    className: "self-start col-start-13 mt-3 ml-0.5 row-start-22",
    placement: "right-end",
  },
};

export default function BodyControls() {
  const { setEditingPart } = useContext(BodyPartsContext);
  return (
    <div className="relative">
      <div className="absolute grid w-full h-full gap-1 grid-cols-24 grid-rows-24">
        {Object.keys(BODY_PARTS).map((bodyPart) => (
          <EditBodyPart
            key={bodyPart}
            bodyPart={bodyPart}
            className={EDIT_BODY_PART_PROPS[bodyPart].className}
            onClick={setEditingPart}
            placement={EDIT_BODY_PART_PROPS[bodyPart].placement}
          />
        ))}
      </div>
      <Skeleton />
    </div>
  );
}

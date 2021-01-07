import Tippy from "@tippyjs/react";
import { useContext } from "react";

import { BODY_PARTS } from "../constants/posenet";
import { BodyPartsContext } from "../context/BodyPartsContext";
import Skeleton from "./Skeleton";
import { useTranslation } from "react-i18next";

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
        className="w-full h-full"
        content={t(`bodyParts.${bodyPart}`)}
        placement={placement}
      >
        <button
          className="w-2 h-2 transition-all duration-300 ease-in-out transform scale-150 rounded-full hover:bg-pallete-complimentary focus:bg-pallete-complimentary hover:scale-225 focus:scale-225 bg-pallete-triadic2"
          onClick={() => onClick(bodyPart)}
        ></button>
      </Tippy>
    </div>
  );
}

export default function BodyControls() {
  const { setEditingPart } = useContext(BodyPartsContext);
  return (
    <div className="relative">
      <div className="absolute grid w-full h-full gap-1 grid-cols-24 grid-rows-24">
        <EditBodyPart
          bodyPart={BODY_PARTS.leftEar.type}
          className="self-end col-start-10 row-start-1 -mb-1"
          onClick={setEditingPart}
          placement="left"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.leftEye.type}
          className="self-end col-start-11 row-start-1 -mb-0.5"
          onClick={setEditingPart}
          placement="top-end"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.nose.type}
          className="self-end col-start-12 row-start-1 -mb-1"
          onClick={setEditingPart}
          placement="top"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.rightEye.type}
          className="self-end col-start-13 row-start-1 -mb-0.5"
          onClick={setEditingPart}
          placement="top-start"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.rightEar.type}
          className="self-end row-start-1 -mb-1 col-start-14"
          onClick={setEditingPart}
          placement="right"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.leftShoulder.type}
          className="self-end col-start-7 row-start-4"
          onClick={setEditingPart}
          placement="top-end"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.rightShoulder.type}
          className="self-end row-start-4 col-start-17"
          onClick={setEditingPart}
          placement="top-start"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.leftElbow.type}
          className="self-end col-start-6 -mb-2 -ml-1 row-start-8"
          onClick={setEditingPart}
          placement="left"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.rightElbow.type}
          className="self-end ml-1 -mb-2 row-start-8 col-start-18"
          onClick={setEditingPart}
          placement="right"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.leftWrist.type}
          className="self-start col-start-3 ml-0.5 -mt-1 row-start-12"
          onClick={setEditingPart}
          placement="left-end"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.rightWrist.type}
          className="self-start -ml-0.5 -mt-1 row-start-12 col-start-21"
          onClick={setEditingPart}
          placement="right-end"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.leftHip.type}
          className="self-start col-start-8 mt-2 row-start-11"
          onClick={setEditingPart}
          placement="bottom-end"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.rightHip.type}
          className="self-start mt-2 row-start-11 col-start-16"
          onClick={setEditingPart}
          placement="bottom-start"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.leftKnee.type}
          className="self-end col-start-10 -mb-1 row-start-17"
          onClick={setEditingPart}
          placement="left-end"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.rightKnee.type}
          className="self-end -mb-1 row-start-17 col-start-14"
          onClick={setEditingPart}
          placement="right-end"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.leftAnkle.type}
          className="self-start col-start-11 mt-3 -ml-0.5 row-start-22"
          onClick={setEditingPart}
          placement="left-end"
        />
        <EditBodyPart
          bodyPart={BODY_PARTS.rightAnkle.type}
          className="self-start col-start-13 mt-3 ml-0.5 row-start-22"
          onClick={setEditingPart}
          placement="right-end"
        />
      </div>
      <Skeleton />
    </div>
  );
}

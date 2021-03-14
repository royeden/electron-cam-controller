import { createDefaultRoute } from "../utils/route";
import { VIDEO } from "./video";

export const BODY_PART = {
  score: "score",
  x: "x",
  y: "y",
};

export const BODY_PARTS = {
  leftEar: "leftEar",
  leftEye: "leftEye",
  nose: "nose",
  rightEye: "rightEye",
  rightEar: "rightEar",
  leftShoulder: "leftShoulder",
  rightShoulder: "rightShoulder",
  leftElbow: "leftElbow",
  rightElbow: "rightElbow",
  leftWrist: "leftWrist",
  rightWrist: "rightWrist",
  leftHip: "leftHip",
  rightHip: "rightHip",
  leftKnee: "leftKnee",
  rightKnee: "rightKnee",
  leftAnkle: "leftAnkle",
  rightAnkle: "rightAnkle",
};

export const BODY_FROM_MAPPER = {
  [BODY_PART.x]: { min: 0, max: VIDEO.width },
  [BODY_PART.y]: { min: 0, max: VIDEO.height },
  [BODY_PART.score]: { min: 0, max: 1 },
};

export const BODY_TO_MAPPER = {
  [BODY_PART.x]: { min: 0, max: 1000 },
  [BODY_PART.y]: { min: 0, max: 1000 },
  [BODY_PART.score]: { min: 0, max: 1 },
};

export function createBodyPartRoute(bodyPart) {
  return {
    [BODY_PART.x]: createDefaultRoute({
      route: `${bodyPart}/x`,
      to: BODY_TO_MAPPER[BODY_PART.x],
    }),
    [BODY_PART.y]: createDefaultRoute({
      route: `${bodyPart}/y`,
      to: BODY_TO_MAPPER[BODY_PART.y],
    }),
    [BODY_PART.score]: createDefaultRoute({
      route: `${bodyPart}/score`,
      to: BODY_TO_MAPPER[BODY_PART.score],
    }),
  };
}

export const BODY_PARTS_ROUTES = {
  [BODY_PARTS.nose]: [createBodyPartRoute(BODY_PARTS.nose)],
  [BODY_PARTS.leftEye]: [createBodyPartRoute(BODY_PARTS.leftEye)],
  [BODY_PARTS.rightEye]: [createBodyPartRoute(BODY_PARTS.rightEye)],
  [BODY_PARTS.leftEar]: [createBodyPartRoute(BODY_PARTS.leftEar)],
  [BODY_PARTS.rightEar]: [createBodyPartRoute(BODY_PARTS.rightEar)],
  [BODY_PARTS.leftShoulder]: [createBodyPartRoute(BODY_PARTS.leftShoulder)],
  [BODY_PARTS.rightShoulder]: [createBodyPartRoute(BODY_PARTS.rightShoulder)],
  [BODY_PARTS.leftElbow]: [createBodyPartRoute(BODY_PARTS.leftElbow)],
  [BODY_PARTS.rightElbow]: [createBodyPartRoute(BODY_PARTS.rightElbow)],
  [BODY_PARTS.leftWrist]: [createBodyPartRoute(BODY_PARTS.leftWrist)],
  [BODY_PARTS.rightWrist]: [createBodyPartRoute(BODY_PARTS.rightWrist)],
  [BODY_PARTS.leftHip]: [createBodyPartRoute(BODY_PARTS.leftHip)],
  [BODY_PARTS.rightHip]: [createBodyPartRoute(BODY_PARTS.rightHip)],
  [BODY_PARTS.leftKnee]: [createBodyPartRoute(BODY_PARTS.leftKnee)],
  [BODY_PARTS.rightKnee]: [createBodyPartRoute(BODY_PARTS.rightKnee)],
  [BODY_PARTS.leftAnkle]: [createBodyPartRoute(BODY_PARTS.leftAnkle)],
  [BODY_PARTS.rightAnkle]: [createBodyPartRoute(BODY_PARTS.rightAnkle)],
};

import { createRoute } from "../utils/route";
import { VIDEO } from "./video";

export const partNames = [
  "nose",
  "leftEye",
  "rightEye",
  "leftEar",
  "rightEar",
  "leftShoulder",
  "rightShoulder",
  "leftElbow",
  "rightElbow",
  "leftWrist",
  "rightWrist",
  "leftHip",
  "rightHip",
  "leftKnee",
  "rightKnee",
  "leftAnkle",
  "rightAnkle",
];

export const FROM_MAPPER = {
  x: { min: 0, max: VIDEO.width },
  y: { min: 0, max: VIDEO.height },
  score: { min: 0, max: 1},
}

export function bodyPartRoute(part) {
  return {
    x: createRoute({
      part,
      route: `${part}/x`,
      from: FROM_MAPPER.x,
      to: { min: 0, max: 1000 },
    }),
    y: createRoute({
      part,
      route: `${part}/y`,
      from: FROM_MAPPER.y,
      to: { min: 0, max: 1000 },
    }),
    score: createRoute({
      part,
      route: `${part}/score`,
    }),
  };
}

export const BODY_PARTS = {
  nose: {
    type: "nose",
    routes: [bodyPartRoute("nose")],
  },
  leftEye: {
    type: "leftEye",
    routes: [bodyPartRoute("leftEye")],
  },
  rightEye: {
    type: "rightEye",
    routes: [bodyPartRoute("rightEye")],
  },
  leftEar: {
    type: "leftEar",
    routes: [bodyPartRoute("leftEar")],
  },
  rightEar: {
    type: "rightEar",
    routes: [bodyPartRoute("rightEar")],
  },
  leftShoulder: {
    type: "leftShoulder",
    routes: [bodyPartRoute("leftShoulder")],
  },
  rightShoulder: {
    type: "rightShoulder",
    routes: [bodyPartRoute("rightShoulder")],
  },
  leftElbow: {
    type: "leftElbow",
    routes: [bodyPartRoute("leftElbow")],
  },
  rightElbow: {
    type: "rightElbow",
    routes: [bodyPartRoute("rightElbow")],
  },
  leftWrist: {
    type: "leftWrist",
    routes: [bodyPartRoute("leftWrist")],
  },
  rightWrist: {
    type: "rightWrist",
    routes: [bodyPartRoute("rightWrist")],
  },
  leftHip: {
    type: "leftHip",
    routes: [bodyPartRoute("leftHip")],
  },
  rightHip: {
    type: "rightHip",
    routes: [bodyPartRoute("rightHip")],
  },
  leftKnee: {
    type: "leftKnee",
    routes: [bodyPartRoute("leftKnee")],
  },
  rightKnee: {
    type: "rightKnee",
    routes: [bodyPartRoute("rightKnee")],
  },
  leftAnkle: {
    type: "leftAnkle",
    routes: [bodyPartRoute("leftAnkle")],
  },
  rightAnkle: {
    type: "rightAnkle",
    routes: [bodyPartRoute("rightAnkle")],
  },
};

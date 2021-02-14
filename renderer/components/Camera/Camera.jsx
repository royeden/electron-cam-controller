// THX <3 <3 <3
// https://medium.com/@kirstenlindsmith/translating-posenet-into-react-js-58f438c8605d
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as poseNet from "@tensorflow-models/posenet";
import "@tensorflow/tfjs-backend-webgl";

import OSC_EVENTS from "../../../main/events/osc";
import Button from "../UI/Button";
import Input from "../UI/Input";
import useAnimation from "../../lib/hooks/useAnimation";
import useToggle from "../../lib/hooks/useToggle";
import useTranslation from "../../lib/hooks/useTranslation";
import tailwind from "../../../tailwind.config";
import { BASE_ROUTES, ROUTES_FROM_MAPPER } from "../../constants/routes";
import { BODY_FROM_MAPPER } from "../../constants/posenet";
import {
  INTERVAL_TYPES,
  INTERVAL_VALUE_TYPES,
  INTERVAL_VALUE_TYPES_DEFAULTS,
  INTERVAL_VALUE_TYPES_LIMITS,
} from "../../constants/intervalConfig";
import { VIDEO } from "../../constants/video";
import { RoutesContext } from "../../context/RoutesContext";
import { drawKeyPoints, drawSkeleton } from "../../utils/posenet";
import { createRoute } from "../../utils/route";
import { map } from "../../utils/object";

// TODO move every useEffect to hooks, it's messy here
const skeletonLineWidth = 5;

export default function Camera() {
  const { t } = useTranslation();
  const { routes } = useContext(RoutesContext);
  const posenet = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, toggleCameraOn] = useToggle();
  const [camera, setCamera] = useState(0);
  const [oscPort, setOscPort] = useState(`${3333}`);
  const [oscPortValue, setOscPortValue] = useState(3333);
  const [oscLoaded, , overrideOscLoaded] = useToggle();
  const [cameras, setCameras] = useState([]);
  const [minScore, setMinScore] = useState(0.3);
  const [modelActive, toggleModelActive] = useToggle();
  const [modelLoaded, , setModelLoaded] = useToggle();
  const [modelSkeleton, toggleModelSkeleton] = useToggle();
  const [trackingType, setTrackingType] = useState(INTERVAL_TYPES.frame);
  const [trackingIntervalType, setTrackingIntervalType] = useState(
    INTERVAL_VALUE_TYPES.ms
  );
  const [trackingInterval, setTrackingInterval] = useState(1000);

  const trackingIntervalValue = useMemo(() => {
    if (trackingIntervalType === INTERVAL_VALUE_TYPES.bpm)
      return 60000 / trackingInterval;
    if (trackingIntervalType === INTERVAL_VALUE_TYPES.fps)
      return 1000 / trackingInterval;
    if (trackingIntervalType === INTERVAL_VALUE_TYPES.ms)
      return trackingInterval;
  }, [trackingInterval, trackingIntervalType]);

  const sendOSCMessage = useCallback(
    (route, ...messages) => {
      if (process.browser && oscLoaded)
        window.ipcRenderer.send(OSC_EVENTS.send, route, ...messages);
    },
    [oscLoaded]
  );

  const createClient = useCallback(() => {
    const port = Math.floor(parseInt(oscPort, 10));
    if (isNaN(port) || port > 65535 || port < 1024) setOscPort(oscPortValue);
    else if (process.browser) {
      overrideOscLoaded(false);
      window.ipcRenderer.send(OSC_EVENTS.create, port);
      window.ipcRenderer.once(OSC_EVENTS.created, () => {
        overrideOscLoaded(true);
        setOscPortValue(port);
      });
    }
  }, [oscPort, oscPortValue]);

  useEffect(() => {
    if (process.browser) {
      // window.ipcRenderer.on(OSC_EVENTS.sent, console.log);
      createClient();
    }
  }, []);

  useEffect(() => {
    function getCameras() {
      if (!navigator.mediaDevices?.enumerateDevices)
        throw new Error("Cannot get media devices from JS");
      return navigator.mediaDevices
        ?.enumerateDevices()
        .then((devices) =>
          devices.filter((device) => device.kind.includes("video"))
        )
        .then((devices) => {
          console.log("Devices list", devices);
          setCameras(devices);
          return devices;
        });
    }
    try {
      getCameras();
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    const video = videoRef?.current;
    const canvas = canvasRef?.current;
    if (video && cameraOn && cameras.length > 0) {
      try {
        async function setupCamera() {
          video.width = VIDEO.width;
          video.height = VIDEO.height;
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: cameras[camera].deviceId,
              width: VIDEO.width,
              height: VIDEO.height,
            },
          });

          video.srcObject = stream;

          return new Promise((resolve) => {
            video.onloadedmetadata = () => {
              video.play();
              resolve(video);
            };
          });
        }
        setupCamera();

        async function setupCanvas() {
          canvas.width = VIDEO.width;
          canvas.height = VIDEO.height;
        }
        setupCanvas();
      } catch (error) {}
    }
  }, [camera, cameraOn, cameras]);

  useEffect(() => {
    try {
      async function loadModel() {
        posenet.current = await poseNet.load();
        setModelLoaded(true);
      }
      loadModel();
    } catch (error) {
      throw error;
    }
  }, []);

  const drawCamera = useCallback(() => {
    const video = videoRef?.current;
    const canvas = canvasRef?.current;
    if (cameraOn && canvas) {
      const canvasContext = canvas.getContext("2d");

      canvasContext.clearRect(0, 0, VIDEO.width, VIDEO.height);

      canvasContext.save();
      canvasContext.scale(-1, 1);
      canvasContext.translate(-VIDEO.width, 0);
      canvasContext.drawImage(video, 0, 0, VIDEO.width, VIDEO.height);
      canvasContext.restore();

      // TODO move this function logic into async/await blocking function
      try {
        let r = 0;
        let g = 0;
        let b = 0;
        const { data: pixels } = canvasContext.getImageData(
          0,
          0,
          VIDEO.width,
          VIDEO.height
        );
        pixels.forEach((colorValue, index) => {
          if (index % 4 === 0) r += colorValue;
          if (index % 4 === 1) g += colorValue;
          if (index % 4 === 2) b += colorValue;
        });
        r /= pixels.length / 4;
        g /= pixels.length / 4;
        b /= pixels.length / 4;
        routes.rgb.forEach((route) => {
          if (route.enabled) {
            const oscRoute = createRoute({
              ...route,
              from: ROUTES_FROM_MAPPER[BASE_ROUTES.rgb],
            });
            sendOSCMessage(
              `/${oscRoute.route}`,
              oscRoute.message(r),
              oscRoute.message(g),
              oscRoute.message(b)
            );
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [cameraOn]);

  const trackPose = useCallback(() => {
    const video = videoRef?.current;
    const canvas = canvasRef?.current;
    const net = posenet?.current;
    if (cameraOn && canvas) {
      const canvasContext = canvas.getContext("2d");
      if (modelActive && modelLoaded) {
        async function detectPose() {
          const { score, keypoints } = await net.estimateSinglePose(video, {
            flipHorizontal: true,
          });
          routes.score.forEach((route) => {
            if (route.enabled) {
              const oscScoreRoute = createRoute({
                ...route,
                from: ROUTES_FROM_MAPPER[BASE_ROUTES.score],
              });
              sendOSCMessage(
                `/${oscScoreRoute.route}`,
                oscScoreRoute.message(score)
              );
            }
          });
          keypoints.forEach(
            ({ part, score: partScore, position: { x, y } }) => {
              const partRoutes = routes[part];
              const bodyPart = { score: partScore, x, y };
              partRoutes.forEach((subroutes) => {
                map(subroutes, (subroute, key) => {
                  if (subroute.enabled) {
                    // TODO this should map to possible resolutions for the camera
                    const oscRoute = createRoute({
                      ...subroute,
                      from: BODY_FROM_MAPPER[key],
                    });
                    sendOSCMessage(
                      `/${oscRoute.route}`,
                      oscRoute.message(bodyPart[key])
                    );
                  }
                });
              });
            }
          );
          canvasContext.clearRect(0, 0, VIDEO.width, VIDEO.height);
          drawCamera();

          if (modelSkeleton) {
            drawKeyPoints(
              keypoints,
              minScore,
              tailwind.theme.extend.colors.pallete.complimentary,
              canvasContext
            );

            drawSkeleton(
              keypoints,
              minScore,
              tailwind.theme.extend.colors.pallete.complimentary,
              skeletonLineWidth,
              canvasContext
            );
          }
        }
        detectPose();
      } else {
        drawCamera();
      }
    }
  }, [cameraOn, minScore, modelActive, modelLoaded, modelSkeleton, routes]);

  useAnimation(
    drawCamera,
    INTERVAL_TYPES.frame,
    cameraOn &&
      !(modelActive && modelSkeleton && trackingType === INTERVAL_TYPES.frame)
  );

  useAnimation(
    trackPose,
    trackingType,
    cameraOn && modelActive && modelLoaded,
    trackingIntervalValue
  );

  return (
    <div className="w-1/2">
      <video className="hidden" playsInline ref={videoRef} />
      <canvas className="w-full" ref={canvasRef} />

      <div className="flex flex-col w-full max-w-screen-md ">
        <div className="flex flex-col items-center my-4">
          {cameraOn ? (
            <div className="flex flex-col flex-wrap items-center justify-between lg:w-full lg:flex-row">
              <Button
                title={"Change camera"}
                onClick={async () => {
                  if (modelActive) toggleModelActive();
                  const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                      deviceId: cameras[camera].deviceId,
                      width: VIDEO.width,
                      height: VIDEO.height,
                    },
                  });
                  stream.getTracks().forEach((track) => track.stop());
                  setCamera((prevCamera) =>
                    prevCamera === cameras.length - 1 ? 0 : prevCamera + 1
                  );
                }}
              >
                Change camera to camera{" "}
                {`${camera === cameras.length - 1 ? 0 : camera + 1}`}
              </Button>
              <Button
                disabled={!modelLoaded}
                title={
                  modelLoaded
                    ? t("camera.controls.tracking.toggle")
                    : t("camera.controls.tracking.modelLoading")
                }
                onClick={toggleModelActive}
              >
                {t("camera.controls.tracking.toggle", {
                  status: modelActive
                    ? t("camera.controls.tracking.status.off")
                    : t("camera.controls.tracking.status.on"),
                })}
              </Button>
              <Button
                disabled={!modelLoaded}
                title={
                  modelLoaded
                    ? t("camera.controls.skeleton.toggle")
                    : t("camera.controls.skeleton.modelLoading")
                }
                onClick={toggleModelSkeleton}
              >
                {t("camera.controls.skeleton.toggle", {
                  status: modelSkeleton
                    ? t("camera.controls.skeleton.status.off")
                    : t("camera.controls.skeleton.status.on"),
                })}
              </Button>
              <select
                className="bg-dark-300"
                value={trackingType}
                onChange={(event) => setTrackingType(event.target.value)}
              >
                {Object.values(INTERVAL_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {trackingType !== INTERVAL_TYPES.frame && (
                <>
                  <select
                    className="bg-dark-300"
                    value={trackingIntervalType}
                    onChange={(event) => {
                      const type = event.target.value;
                      if (
                        trackingInterval <
                          INTERVAL_VALUE_TYPES_LIMITS[type].min ||
                        trackingInterval > INTERVAL_VALUE_TYPES_LIMITS[type].max
                      )
                        setTrackingInterval(
                          INTERVAL_VALUE_TYPES_DEFAULTS[type]
                        );
                      setTrackingIntervalType(type);
                    }}
                  >
                    {Object.values(INTERVAL_VALUE_TYPES).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <Input
                    {...INTERVAL_VALUE_TYPES_LIMITS[trackingIntervalType]}
                    step="1"
                    value={trackingInterval}
                    type="number"
                    className="bg-dark-100 border-dark-100"
                    onChange={(event) => {
                      const value = parseInt(event.target.value, 10);
                      setTrackingInterval((prevState) =>
                        value >=
                          INTERVAL_VALUE_TYPES_LIMITS[trackingIntervalType]
                            .min &&
                        value <=
                          INTERVAL_VALUE_TYPES_LIMITS[trackingIntervalType].max
                          ? value
                          : prevState
                      );
                    }}
                  />
                  {trackingIntervalType}
                </>
              )}
            </div>
          ) : (
            <>
              <p className="mb-4">{t("camera.controls.camera.notice")}</p>
              <Button onClick={toggleCameraOn}>
                {t("camera.controls.camera.turnOn")}
              </Button>
            </>
          )}
        </div>
        {/* <div className="flex justify-between w-full">
          <label className="cursor-pointer" htmlFor="min-score">
            Min tracking score:
          </label>
          <div className="flex justify-between">
            <input
              id="min-score"
              min="0.1"
              max="0.5"
              onChange={(event) => setMinScore(event.target.value)}
              step="0.1"
              type="range"
              value={minScore}
            />
            <span>{Math.floor(minScore * 100)}%</span>
          </div>
        </div> */}
        <div className="flex items-center justify-between w-full my-4">
          <label className="cursor-pointer" htmlFor="osc-port">
            {t("camera.controls.osc.name")}:
          </label>
          <div className="flex justify-between">
            <input
              className="w-32 p-2 transition-colors duration-300 ease-in-out border-2 rounded-md hover:text-light focus:text-light text-light-high bg-dark hover:border-white focus:border-white hover:bg-dark-100 border-dark-800"
              id="osc-port"
              min="1023"
              max="65535"
              onKeyDown={(event) => {
                if (event.key === "Enter") createClient();
              }}
              onChange={(event) => setOscPort(event.target.value)}
              step="1"
              type="number"
              value={oscPort}
            />
            <Button onClick={createClient}>
              {t("camera.controls.osc.setter")}
            </Button>
          </div>
        </div>
        <span>
          {t("camera.client.name")}:{" "}
          {oscLoaded
            ? t("camera.client.status.active", { port: oscPortValue })
            : t("camera.client.status.inactive")}
        </span>
        <span>
          {t("camera.model.tracking")}:{" "}
          {modelActive
            ? `${t("camera.model.status.active")}!`
            : `${t("camera.model.status.inactive")}`}
        </span>
        <span>
          {t("camera.model.skeleton")}:{" "}
          {modelSkeleton
            ? `${t("camera.model.status.active")}!`
            : `${t("camera.model.status.inactive")}`}
        </span>
        <span>
          {t("camera.model.name")}:{" "}
          {modelLoaded
            ? `${t("camera.model.status.loaded")}!`
            : `${t("camera.model.status.loading")}...`}
        </span>
      </div>
    </div>
  );
}

import { BODY_PART } from "../constants/posenet";
import { validateRoute } from "./route";

/**
 * Determines if a route is valid
 * @param {Object} bodyPart Body part routes object
 * @param {Object} bodyPart.x
 * @param {boolean} bodyPart.x.constrain constrain mapped value within limits?
 * @param {boolean} bodyPart.x.enabled send messages to route?
 * @param {string} bodyPart.x.route OSC route
 * @param {Object} bodyPart.x.to Mapper
 * @param {number} bodyPart.x.to.max
 * @param {number} bodyPart.x.to.min
 * @param {Object} bodyPart.y
 * @param {boolean} bodyPart.y.constrain constrain mapped value within limits?
 * @param {boolean} bodyPart.y.enabled send messages to route?
 * @param {string} bodyPart.y.route OSC route
 * @param {Object} bodyPart.y.to Mapper
 * @param {number} bodyPart.y.to.max
 * @param {number} bodyPart.y.to.min
 * @param {Object} bodyPart.score
 * @param {boolean} bodyPart.score.constrain constrain mapped value within limits?
 * @param {boolean} bodyPart.score.enabled send messages to route?
 * @param {string} bodyPart.score.route OSC route
 * @param {Object} bodyPart.score.to Mapper
 * @param {number} bodyPart.score.to.max
 * @param {number} bodyPart.score.to.min
 * @returns {boolean}
 */

export function validateBodyPart(bodyPart) {
  return (
    Object.values(BODY_PART).every((prop) => bodyPart.hasOwnProperty(prop)) &&
    Object.values(bodyPart).every(validateRoute)
  );
}

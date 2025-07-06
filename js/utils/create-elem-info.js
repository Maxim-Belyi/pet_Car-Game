import { getCoords } from "./get-coords.js";

export function createElementInfo(element) {
    return {
      width: element.clientWidth,
      height: element.clientHeight,
      coords: getCoords(element),
      visible: true,
    };
  }
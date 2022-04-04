import { bgCanvas } from "./backgroundCanvas.js";
import { setDimensions } from "./state.js";
import debounce from "./debounce.js";

export const canvas = document.body.querySelector(
  "#canvas"
) as HTMLCanvasElement;
const p = canvas.parentNode as HTMLElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.translate(0.5, 0.5);
ctx.scale(devicePixelRatio, devicePixelRatio);

export function resizeCanvas() {
  const rect = p.getBoundingClientRect();
  setDimensions(rect.width, rect.height);
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
  bgCanvas.width = rect.width * devicePixelRatio;
  bgCanvas.height = rect.height * devicePixelRatio;
}

export const debouncedResize = debounce(resizeCanvas, 100);

const rAF = window.requestAnimationFrame;
import { updateState, setDimensions } from "./state.js";
import debounce from "./debounce.js";
import drawScene from "./drawScene.js";

// DRAWING ------------------------------------------------

function onTick(ctx: CanvasRenderingContext2D, tick: number) {
  const state = updateState(tick);
  drawScene(ctx, state);
}

function main(ctx: CanvasRenderingContext2D) {
  function frame(prevtime: number) {
    return function nextFrame(time: number) {
      const tick = time - prevtime;
      onTick(ctx, tick);
      rAF(frame(time));
    };
  }

  rAF(frame(0));
}

// NOISE ----------------------------------------

const canvas = document.body.querySelector("#canvas") as HTMLCanvasElement;
const p = canvas.parentNode as HTMLElement;

function resizeCanvas() {
  const rect = p.getBoundingClientRect();
  setDimensions(rect.width, rect.height);
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
}

const debouncedResize = debounce(resizeCanvas, 100);

window.addEventListener("resize", debouncedResize);

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.translate(0.5, 0.5);
ctx.scale(devicePixelRatio, devicePixelRatio);

resizeCanvas();

main(ctx);

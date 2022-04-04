import {
  ctx,
  canvas,
  bgCtx,
  bgCanvas,
  setDimensions,
  updateState,
} from "./internal";
import debounce from "./debounce";
import { drawScene } from "./drawScene";

const rAF = window.requestAnimationFrame;

// DRAWING ------------------------------------------------

function onTick(ctx: CanvasRenderingContext2D, tick: number) {
  const state = updateState(tick, function runEffects() {
    // We back up the current canvas image to another canvas for reference.
    bgCtx.drawImage(canvas, 0, 0);
  });
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

// INIT ----------------------------------------

const p = canvas.parentNode as HTMLElement;
function resizeCanvas() {
  const rect = p.getBoundingClientRect();
  setDimensions(rect.width, rect.height);
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
  bgCanvas.width = rect.width * devicePixelRatio;
  bgCanvas.height = rect.height * devicePixelRatio;
}

resizeCanvas();
const debouncedResize = debounce(resizeCanvas, 100);

window.addEventListener("resize", debouncedResize);

main(ctx);

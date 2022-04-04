const rAF = window.requestAnimationFrame;
import { updateState } from "./state.js";
import drawScene from "./drawScene.js";
import { ctx, debouncedResize, resizeCanvas } from "./canvas.js";

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

// INIT ----------------------------------------

window.addEventListener("resize", debouncedResize);

resizeCanvas();

main(ctx);

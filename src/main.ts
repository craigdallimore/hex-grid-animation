const rAF = window.requestAnimationFrame;
import { updateState } from "./state.js";
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

const canvas = document.body.querySelector("#canvas");
if (canvas instanceof HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (ctx instanceof CanvasRenderingContext2D) {
    main(ctx);
  }
}

const rAF = window.requestAnimationFrame;
import { updateState } from "./state.js";
import drawScene from "./drawScene.js";
// DRAWING ------------------------------------------------
function onTick(ctx, tick) {
    const state = updateState(tick);
    drawScene(ctx, state);
}
function main(ctx) {
    function frame(prevtime) {
        return function nextFrame(time) {
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

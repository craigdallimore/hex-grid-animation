import getPointOnPath from "./getPointOnPath";
import type { State } from "./state";

export default function drawScene(
  ctx: CanvasRenderingContext2D,
  state: State
): void {
  ctx.clearRect(0, 0, state.ui.width, state.ui.height);

  // -----------
  state.grid.forEach((row) => {
    row.forEach((point) => {
      ctx.save();
      ctx.fillStyle = "hotpink";
      ctx.fillRect(point.x, point.y, 3, 3);
      ctx.restore();
    });
  });

  // ------------
  ctx.save();
  if (state.path.length > 0) {
    ctx.strokeStyle = "cyan";
    ctx.beginPath();
    ctx.moveTo(state.path[0].x, state.path[0].y);
    state.path.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }
  ctx.restore();
  // --------------
  const distance = state.travel * state.path.length;
  const [x, y] = getPointOnPath(state.path, distance);
  ctx.save();
  ctx.fillStyle = "rebeccapurple";
  ctx.fillRect(x - 6, y - 6, 12, 12);
  ctx.restore();
  // ----------------
}

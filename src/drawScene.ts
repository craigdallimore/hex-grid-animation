import type { State } from "./state";

export default function drawScene(
  ctx: CanvasRenderingContext2D,
  state: State
): void {
  ctx.clearRect(0, 0, state.ui.width, state.ui.height);
  ctx.fillStyle = "papayawhip";

  state.grid.forEach((row) => {
    row.forEach(([x, y]) => {
      ctx.save();
      ctx.fillStyle = "hotpink";
      ctx.fillRect(x, y, 3, 3);
      ctx.restore();
    });
  });
}

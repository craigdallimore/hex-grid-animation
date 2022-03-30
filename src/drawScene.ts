import type { State } from "./state";

export default function drawScene(
  ctx: CanvasRenderingContext2D,
  state: State
): void {
  ctx.clearRect(0, 0, state.ui.width, state.ui.height);
  ctx.fillStyle = "papayawhip";
  ctx.fillRect(10, 10, state.ui.width - 20, state.ui.height - 20);
}

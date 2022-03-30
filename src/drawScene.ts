import type { State } from "./state";

export default function drawScene(
  ctx: CanvasRenderingContext2D,
  state: State
): void {
  ctx.clearRect(0, 0, 400, 400);
}

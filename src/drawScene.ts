import getPointOnPath from "./getPointOnPath";
import type { Grid, Point, State, Path } from "./state";

function drawPoint(ctx: CanvasRenderingContext2D, point: Point) {
  ctx.save();
  ctx.fillStyle = "hotpink";
  ctx.fillRect(point.x, point.y, 3, 3);

  ctx.fillStyle = "#333333";
  ctx.font = "6pt sans-serif";
  ctx.fillText(`C${point.col}:R${point.row}`, point.x + 10, point.y + 10);
  ctx.fillText(`C${point.col}:R${point.row}`, point.x - 30, point.y + 10);
  ctx.fillText(`C${point.col}:R${point.row}`, point.x + 10, point.y - 3);
  ctx.fillText(`C${point.col}:R${point.row}`, point.x - 30, point.y - 3);

  ctx.restore();
}

function drawGrid(ctx: CanvasRenderingContext2D, grid: Grid) {
  grid.forEach((row) => {
    row.forEach((point) => drawPoint(ctx, point));
  });
}

function drawTraveller(ctx: CanvasRenderingContext2D, state: State) {
  const distance = state.travel * state.path.length;
  const [x, y] = getPointOnPath(state.path, distance);
  ctx.save();
  ctx.fillStyle = "rebeccapurple";
  ctx.fillRect(x - 6, y - 6, 12, 12);
  ctx.restore();
}

function drawPath(ctx: CanvasRenderingContext2D, path: Path) {
  ctx.save();
  if (path.length > 0) {
    ctx.strokeStyle = "cyan";
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }
  ctx.restore();
}

export default function drawScene(
  ctx: CanvasRenderingContext2D,
  state: State
): void {
  ctx.clearRect(0, 0, state.ui.width, state.ui.height);

  drawGrid(ctx, state.grid);
  drawPath(ctx, state.path);
  drawTraveller(ctx, state);
}

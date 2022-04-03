import getPointOnPath from "./getPointOnPath";
import type { Grid, Point, State, Path } from "./state";

function drawPoint(ctx: CanvasRenderingContext2D, point: Point) {
  ctx.save();
  ctx.fillStyle = "hotpink";
  ctx.fillRect(point.x, point.y, 1, 1);
  ctx.restore();
}

function drawGrid(ctx: CanvasRenderingContext2D, grid: Grid) {
  grid.forEach((row) => {
    row.forEach((point) => drawPoint(ctx, point));
  });
}

function drawTraveller(
  ctx: CanvasRenderingContext2D,
  state: State,
  offset: number,
  colour: string
) {
  const d1 =
    state.travel > offset ? (state.travel - offset) * state.path.length : 0;

  const [x, y] = getPointOnPath(state.path, d1);
  ctx.save();
  ctx.fillStyle = colour;
  ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
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
  //ctx.clearRect(0, 0, state.ui.width, state.ui.height);
  //drawGrid(ctx, state.grid);
  //drawPath(ctx, state.path);
  drawTraveller(ctx, state, 0, "red");
  drawTraveller(ctx, state, 1, "orange");
  drawTraveller(ctx, state, 2, "yellow");
  drawTraveller(ctx, state, 7, "black");
}

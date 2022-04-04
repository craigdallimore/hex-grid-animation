import getTravelledPath from "./getTravelledPath";
import getPointOnPath from "./getPointOnPath";
import type { Grid, Point, State, Path } from "./state";
import { bgCanvas } from "./backgroundCanvas";
import { Vector } from "@decoy9697/vector";

function drawPoint(ctx: CanvasRenderingContext2D, point: Point) {
  ctx.save();
  ctx.fillStyle = "hotpink";
  ctx.fillRect(point.x, point.y, 1, 1);
  ctx.restore();
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  position: Vector,
  radius: number,
  fillStyle: string
): CanvasRenderingContext2D {
  const [x, z] = position;

  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.moveTo(x - radius, z - radius);
  ctx.ellipse(x, z, radius * 2, radius * 2, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  return ctx;
}

function drawTraveller(ctx: CanvasRenderingContext2D, state: State) {
  const pathLengthInPx = state.path.length * state.edgeLength;
  const d1 = state.travel * (pathLengthInPx / 100);

  const [x, y] = getPointOnPath(state.path, d1);

  const travelPath = getTravelledPath(state.path, [x, y]);
  if (state.travel < 97) {
    drawCircle(ctx, [x, y], 2, "hotpink");
  }

  drawPath(ctx, travelPath);
}

function drawPath(ctx: CanvasRenderingContext2D, path: Path) {
  ctx.save();
  if (path.length > 0) {
    ctx.strokeStyle = "cyan";
    ctx.beginPath();
    //ctx.setLineDash([4, 10]);
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
  ctx.drawImage(bgCanvas, 0, 0);
  drawTraveller(ctx, state);
}

import { Grid, Point } from "./state";

const getAdj = (h: number, a: number) => Math.cos(a) * h;
const getOpp = (h: number, a: number) => Math.sin(a) * h;

export default function makeGrid(
  edgeLength: number,
  angle: number,
  width: number,
  height: number
): Grid {
  const [xGap, yGap] = [getAdj(edgeLength, angle), getOpp(edgeLength, angle)];

  const rows = [];

  for (let y = 0, row = 0; y < height; y += yGap * 2, row += 2) {
    const evenCol = [];
    const oddCol = [];
    for (let x = 0, col = 0; x < width; x += xGap * 2, col += 1) {
      const point: Point = { x, y, col, row };
      evenCol.push(point);
    }
    for (let x = xGap, col = 0; x < width; x += xGap * 2, col += 1) {
      const point: Point = { x, y: y + yGap, col, row: row + 1 };
      oddCol.push(point);
    }

    rows.push(evenCol);
    rows.push(oddCol);
  }

  return rows;
}

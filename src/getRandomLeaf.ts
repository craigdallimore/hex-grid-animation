import { Grid, Point } from "./state";

function pointsShareEdge(p1: Point, p2: Point, grid: Grid): boolean {
  if (p1.row === 0 && p2.row === 0) {
    return true;
  }

  if (p1.row === grid.length - 1 && p2.row === grid.length - 1) {
    return true;
  }

  if (p1.col === 0 && p1.row % 2 === 0 && p2.col === 0 && p2.row % 2 === 0) {
    return true;
  }

  if (
    p1.col === grid[0].length - 1 &&
    p1.row % 2 === 0 &&
    p2.col === grid[0].length - 1 &&
    p2.row % 2 === 0
  ) {
    return true;
  }

  return false;
}

export default function getRandomLeaf(
  grid: Grid,
  lastPoint: Point | null
): Point {
  const validPoints = grid
    .reduce((acc, row) => {
      return row.reduce((innacc, point) => {
        if (point.row === 0) {
          return [...innacc, point];
        }
        if (point.row % 2 === 0) {
          // even row
          if (point.row === grid.length - 1) {
            return [...innacc, point];
          }
          if (point.col === 0) {
            return [...innacc, point];
          }
          if (point.col === row.length - 1) {
            return [...innacc, point];
          }
        }
        return innacc;
      }, acc);
    }, [])
    .filter((point) => {
      if (!lastPoint) {
        return true;
      }
      return !pointsShareEdge(point, lastPoint, grid);
    });

  const randomIndex = Math.floor(Math.random() * validPoints.length);
  return validPoints[randomIndex];
}

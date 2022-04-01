import { Grid, Point } from "./state";

export default function getRandomLeaf(grid: Grid): Point {
  const validPoints = grid.reduce((acc, row) => {
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
  }, []);

  const randomIndex = Math.floor(Math.random() * validPoints.length);
  return validPoints[randomIndex];
}

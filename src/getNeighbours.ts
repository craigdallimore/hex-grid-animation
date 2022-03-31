import { Grid, Point } from "./state";

const isEven = (n: number) => n % 2 === 0;

export const getNeighbours =
  (grid: Grid) =>
  ({ col, row }: Point): Array<Point> => {
    const isEvenRow = isEven(row);
    const lastRowIndex = grid.length - 1;
    const lastColIndex = isEvenRow ? grid[0].length - 1 : grid[1].length - 1;

    const hasOneRowAbove = row > 0;
    const hasTwoRowsAbove = row > 1;
    const hasOneRowBelow = row < lastRowIndex;
    const hasTwoRowsBelow = row < lastRowIndex - 1;

    const hasColToLeft = col > 0;
    const hasColToRight = col < lastColIndex;

    const neighbours = [];

    if (hasOneRowAbove) {
      if (hasColToLeft) {
        // Top left
        neighbours.push(grid[row - 1][isEvenRow ? col : col - 1]);
      }
      if (hasColToRight) {
        // Top right
        neighbours.push(grid[row - 1][isEvenRow ? col : col + 1]);
      }
    }
    // Directly above
    if (hasTwoRowsAbove) {
      neighbours.push(grid[row - 2][col]);
    }

    if (hasOneRowBelow) {
      if (hasColToLeft) {
        // Bottom left
        neighbours.push(grid[row + 1][isEvenRow ? col : col - 1]);
      }
      if (hasColToRight) {
        // Bottom right
        neighbours.push(grid[row + 1][isEvenRow ? col : col + 1]);
      }
    }

    // Directly below
    if (hasTwoRowsBelow) {
      neighbours.push(grid[row + 2][col]);
    }

    return neighbours;
  };
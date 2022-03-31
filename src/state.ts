import aStar from "@decoy9697/a-star";
import { getNeighbours } from "./getNeighbours";
export type Point = {
  col: number;
  row: number;
  x: number;
  y: number;
};
export type Grid = Array<Array<Point>>;

export type State = {
  ui: {
    width: number;
    height: number;
  };
  grid: Grid;
  path: Array<Point>;
};

const state: State = {
  ui: {
    width: 0,
    height: 0,
  },
  grid: [],
  path: [],
};

const getAdj = (h: number, a: number) => Math.cos(a) * h;
const getOpp = (h: number, a: number) => Math.sin(a) * h;

function makeGrid(width: number, height: number): Grid {
  const edgeLength: number = 100;
  const angle: number = (30 * Math.PI) / 180;

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

export function updateState(tick: number): State {
  return state;
}

function eqNode(a: Point, b: Point): boolean {
  if (!a || !b) {
    return false;
  }
  return a.col === b.col && a.row === b.row;
}

function heuristic(a: Point, b: Point): number {
  const h = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  // Add some randomness so the path is a more scenic route
  return h + Math.random() * 650;
}

export function setDimensions(width: number, height: number): void {
  state.ui.width = width;
  state.ui.height = height;
  state.grid = makeGrid(width, height);

  const start = state.grid[0][0];
  const lastRow = state.grid[state.grid.length - 1];
  const goal = lastRow[lastRow.length - 1];

  const result = aStar({
    start,
    goal,
    getNeighbours: getNeighbours(state.grid),
    eqNode,
    heuristic,
  });

  state.path = result.reachedGoal ? result.path : [];
}

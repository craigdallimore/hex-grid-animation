import aStar from "@decoy9697/a-star";
import { getNeighbours } from "./getNeighbours";
import getRandomLeaf from "./getRandomLeaf";
import makeGrid from "./makeGrid";
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
  travel: number;
};

const edgeLength: number = 100;
const angle: number = (30 * Math.PI) / 180;

const state: State = {
  ui: {
    width: 0,
    height: 0,
  },
  grid: [],
  path: [],
  travel: 0,
};

export function updateState(tick: number): State {
  const increment = tick / 100;

  const nextTravel = state.travel + increment;

  if (nextTravel > 100) {
    startNewLine();
  } else {
    state.travel = nextTravel;
  }

  return state;
}

function eqNode(a: Point, b: Point): boolean {
  if (!a || !b) {
    return false;
  }
  return a.col === b.col && a.row === b.row;
}

function heuristic(a: Point, b: Point): number {
  try {
    const h = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    // Add some randomness so the path is a more scenic route
    return h + Math.random() * edgeLength * 6.5;
  } catch (e) {
    console.error(e);
    console.log({ a, b });
    return 0;
  }
}

function startNewLine() {
  const start = getRandomLeaf(state.grid);
  const goal = getRandomLeaf(state.grid);
  console.log({ start, goal });

  const result = aStar({
    start,
    goal,
    getNeighbours: getNeighbours(state.grid),
    eqNode,
    heuristic,
  });

  state.path = result.reachedGoal ? result.path.reverse() : [];
  state.travel = 0;
}

export function setDimensions(width: number, height: number): void {
  state.ui.width = width;
  state.ui.height = height;
  state.grid = makeGrid(edgeLength, angle, width, height);
  startNewLine();
}

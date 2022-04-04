import aStar from "@decoy9697/a-star";
import { bgCtx } from "./backgroundCanvas";
import { canvas } from "./canvas";
import { getNeighbours } from "./getNeighbours";
import getRandomLeaf from "./getRandomLeaf";
import makeGrid from "./makeGrid";

export type Point = {
  col: number;
  row: number;
  x: number;
  y: number;
};

export type Path = Array<Point>;

export type Grid = Array<Array<Point>>;

export type State = {
  ui: {
    width: number;
    height: number;
  };
  edgeLength: number;
  grid: Grid;
  path: Path;
  travel: number;
};

const angle: number = (30 * Math.PI) / 180;

const state: State = {
  ui: {
    width: 0,
    height: 0,
  },
  edgeLength: 30,
  grid: [],
  path: [],
  travel: 0,
};

export function updateState(tick: number): State {
  const increment = tick / 60;

  const nextTravel = state.travel + increment;

  if (nextTravel >= 100) {
    startNewLine();

    // We back up the current canvas image to another canvas for reference.
    bgCtx.drawImage(canvas, 0, 0);
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
    const randVal = Math.random() * state.edgeLength * 6.5;
    return h + randVal;
  } catch (e) {
    console.error(e);
    console.log({ a, b });
    return 0;
  }
}

function startNewLine() {
  const lastGoal = state.path[state.path.length - 1];

  const start = lastGoal || getRandomLeaf(state.grid, null);
  const goal = getRandomLeaf(state.grid, start);

  const result = aStar({
    start,
    goal,
    getNeighbours: getNeighbours(state.grid),
    eqNode,
    heuristic,
  });

  if (!result.reachedGoal) {
    startNewLine();
  } else {
    state.path = result.reachedGoal ? result.path.reverse() : [];
    state.travel = 0;
  }
}

export function setDimensions(width: number, height: number): void {
  state.ui.width = width;
  state.ui.height = height;
  state.grid = makeGrid(state.edgeLength, angle, width, height);
  startNewLine();
}

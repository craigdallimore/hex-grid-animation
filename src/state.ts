export type Point = [number, number];
export type Grid = Array<Array<Point>>;

export type State = {
  ui: {
    width: number;
    height: number;
  };
  grid: Grid;
};

const state: State = {
  ui: {
    width: 0,
    height: 0,
  },
  grid: [],
};

const getAdj = (h: number, a: number) => Math.cos(a) * h;
const getOpp = (h: number, a: number) => Math.sin(a) * h;

function makeGrid(width: number, height: number): Grid {
  const edgeLength: number = 100;
  const angle: number = (30 * Math.PI) / 180;

  const [xGap, yGap] = [getAdj(edgeLength, angle), getOpp(edgeLength, angle)];

  const rows = [];

  for (let y = 0; y < height; y += yGap * 2) {
    const evenCol = [];
    const oddCol = [];
    for (let x = 0; x < width; x += xGap * 2) {
      const point: Point = [x, y];
      evenCol.push(point);
    }
    for (let x = xGap; x < width; x += xGap * 2) {
      const point: Point = [x, y + yGap];
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

export function setDimensions(width: number, height: number): void {
  state.ui.width = width;
  state.ui.height = height;
  state.grid = makeGrid(width, height);
}

import { distance, Vector } from "@decoy9697/vector";
import { Path, Point } from "./internal";

type Acc = {
  done: boolean;
  distance: number;
  path: Path;
};

export default function getTravelledPath(path: Path, xy: Vector): Path {
  const [x, y] = xy;
  return path.reduce(
    (acc: Acc, point: Point, index: number) => {
      if (acc.done) {
        return acc;
      }

      if (index === 0) {
        return {
          done: false,
          path: [point],
          distance: 0,
        };
      }

      const lastPoint = path[index - 1];

      const distanceToNextPoint = distance(
        [lastPoint.x, lastPoint.y],
        [point.x, point.y]
      );
      const distanceToXY = distance([lastPoint.x, lastPoint.y], [x, y]);

      if (distanceToXY < distanceToNextPoint) {
        return {
          done: true,
          distance: acc.distance + distanceToXY,
          path: [
            ...acc.path,
            {
              x,
              y,
              row: -1,
              col: -1,
            },
          ],
        };
      } else {
        return {
          done: false,
          distance: acc.distance + distanceToNextPoint,
          path: [...acc.path, point],
        };
      }
    },
    {
      done: false,
      distance: 0,
      path: [],
    }
  ).path;
}

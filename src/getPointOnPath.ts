import { Point, Path } from "./state";
import {
  distance,
  subtract,
  multiply,
  normalise,
  Vector,
} from "@decoy9697/vector";

type Acc = {
  distance: number;
  xy: Vector;
  done: boolean;
};

export default function getPointOnPath(
  path: Path,
  distanceAlongPath: number
): Vector {
  const { x, y } = path[0];

  const init: Acc = {
    distance: 0,
    xy: [x, y],
    done: false,
  };

  return path.reduce((acc: Acc, point: Point): Acc => {
    if (acc.done) {
      return acc;
    }

    const xy = [point.x, point.y] as Vector;

    const accDist = acc.distance + distance(acc.xy, xy);

    if (accDist < distanceAlongPath) {
      // have not arrived yet
      return {
        distance: accDist,
        xy: [point.x, point.y],
        done: false,
      };
    }

    const remainingDistance = distanceAlongPath - acc.distance;
    const v = subtract(acc.xy, xy);
    const nodeAtParam = subtract(
      acc.xy,
      multiply(normalise(v), remainingDistance)
    );

    return {
      distance: acc.distance,
      xy: nodeAtParam,
      done: true,
    };
  }, init).xy;
}

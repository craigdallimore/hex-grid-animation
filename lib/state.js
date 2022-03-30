import { add, vectorToRadians, radiansToVector, multiply, vlength, } from "./vector.js";
function makeCircle(centre) {
    return {
        cw: Math.random() > 0.5,
        speed: Math.random() + 1000,
        centre,
        point: [-10 + Math.random() * 20, -10 + Math.random() * 20],
    };
}
const state = {
    edges: [],
    circles: [
        // Row 1
        makeCircle([50, 50]),
        makeCircle([50, 150]),
        makeCircle([50, 250]),
        makeCircle([50, 350]),
        // Row 2
        makeCircle([150, 100]),
        makeCircle([150, 200]),
        makeCircle([150, 300]),
        // Row 3
        makeCircle([250, 50]),
        makeCircle([250, 150]),
        makeCircle([250, 250]),
        makeCircle([250, 350]),
        // Row 4
        makeCircle([350, 100]),
        makeCircle([350, 200]),
        makeCircle([350, 300]),
    ],
};
function updateOrbit(circle, tick) {
    const radians = vectorToRadians(circle.point);
    const rate = tick / circle.speed;
    const nextRad = circle.cw ? radians + rate : radians - rate;
    const nextVec = radiansToVector(nextRad);
    const nextPoint = multiply(nextVec, vlength(circle.point));
    return Object.assign(Object.assign({}, circle), { point: nextPoint });
}
function getAbsPoint(circle) {
    return add(circle.point, circle.centre);
}
export function updateState(tick) {
    state.circles = state.circles.map((circle) => {
        return updateOrbit(circle, tick);
    });
    state.edges = [
        [getAbsPoint(state.circles[0]), getAbsPoint(state.circles[1])],
        [getAbsPoint(state.circles[1]), getAbsPoint(state.circles[4])],
        [getAbsPoint(state.circles[4]), getAbsPoint(state.circles[0])],
        //
        [getAbsPoint(state.circles[1]), getAbsPoint(state.circles[2])],
        [getAbsPoint(state.circles[2]), getAbsPoint(state.circles[5])],
        [getAbsPoint(state.circles[5]), getAbsPoint(state.circles[1])],
        //
        [getAbsPoint(state.circles[2]), getAbsPoint(state.circles[3])],
        [getAbsPoint(state.circles[3]), getAbsPoint(state.circles[6])],
        [getAbsPoint(state.circles[6]), getAbsPoint(state.circles[2])],
        //
        [getAbsPoint(state.circles[4]), getAbsPoint(state.circles[7])],
        [getAbsPoint(state.circles[7]), getAbsPoint(state.circles[8])],
        [getAbsPoint(state.circles[8]), getAbsPoint(state.circles[4])],
        //
        [getAbsPoint(state.circles[5]), getAbsPoint(state.circles[8])],
        [getAbsPoint(state.circles[8]), getAbsPoint(state.circles[9])],
        [getAbsPoint(state.circles[9]), getAbsPoint(state.circles[5])],
        //
        [getAbsPoint(state.circles[6]), getAbsPoint(state.circles[9])],
        [getAbsPoint(state.circles[9]), getAbsPoint(state.circles[10])],
        [getAbsPoint(state.circles[10]), getAbsPoint(state.circles[6])],
        //
        [getAbsPoint(state.circles[8]), getAbsPoint(state.circles[11])],
        [getAbsPoint(state.circles[11]), getAbsPoint(state.circles[7])],
        //
        [getAbsPoint(state.circles[9]), getAbsPoint(state.circles[12])],
        [getAbsPoint(state.circles[12]), getAbsPoint(state.circles[8])],
        //
        [getAbsPoint(state.circles[10]), getAbsPoint(state.circles[13])],
        [getAbsPoint(state.circles[13]), getAbsPoint(state.circles[9])],
        //
        [getAbsPoint(state.circles[4]), getAbsPoint(state.circles[5])],
        [getAbsPoint(state.circles[5]), getAbsPoint(state.circles[6])],
        //
        [getAbsPoint(state.circles[11]), getAbsPoint(state.circles[12])],
        [getAbsPoint(state.circles[12]), getAbsPoint(state.circles[13])],
    ];
    /*
    const lastEdge: Edge = [
      getAbsPoint(state.circles[0]),
      getAbsPoint(state.circles[state.circles.length - 1]),
    ];
  
    state.edges = state.circles.reduce(
      (acc, circle) => {
        const edge: Edge = [acc[acc.length - 1][1], getAbsPoint(circle)];
        return [...acc, edge];
      },
      [lastEdge]
    );
     */
    return state;
}

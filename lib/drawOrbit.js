import { add } from "./vector.js";
export default function drawOrbit(ctx, circle) {
    const [x, z] = add(circle.centre, circle.point);
    ctx.save();
    ctx.fillStyle = "hotpink";
    ctx.fillRect(x, z, 2, 2);
    ctx.restore();
}

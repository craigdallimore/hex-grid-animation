function drawEdge(ctx, [v1, v2]) {
    ctx.save();
    ctx.strokeStyle = "hotpink";
    ctx.beginPath();
    ctx.moveTo(v1[0], v1[1]);
    ctx.lineTo(v2[0], v2[1]);
    ctx.stroke();
    ctx.restore();
}
export default function drawScene(ctx, state) {
    ctx.clearRect(0, 0, 400, 400);
    // Create points to make hex grid
    // Create edges
    /*
    state.circles.forEach((circle: Circle) => {
      drawOrbit(ctx, circle);
    });
     */
    state.edges.forEach((edge) => {
        drawEdge(ctx, edge);
    });
}

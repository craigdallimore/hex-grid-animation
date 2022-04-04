export const bgCanvas = document.createElement("canvas");
export const bgCtx = bgCanvas.getContext("2d") as CanvasRenderingContext2D;
bgCtx.globalCompositeOperation = "darken";

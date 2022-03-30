// VECTOR ----------------------------------------------------
export function vectorToRadians(v) {
    const [x, z] = toUnitVector(v);
    return Math.atan2(z, x);
}
export function radiansToVector(r) {
    return [Math.cos(r), Math.sin(r)];
}
export function add([ax, az], [bx, bz]) {
    return [ax + bx, az + bz];
}
export function vlength([x, z]) {
    return Math.hypot(x, z);
}
export function multiply([x, z], i) {
    return [x * i, z * i];
}
export function toUnitVector(v) {
    const l = vlength(v);
    return l === 0 ? v : multiply(v, 1 / vlength(v));
}

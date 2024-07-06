export const PI = Math.PI;
export const PI2 = PI / 2;
export const PI3 = 3 * PI / 2;
export const RAD = PI / 180;

export const fixAngle = (angle: number) => {
  if (angle > 359) { angle -= 360; }
  if (angle < 0) { angle += 360; }
  return angle;
}
export const degreesToRadians = (angle: number) => angle * PI / 180.0;
export const clamp = (min: number, max: number, value: number) =>
  (max < value ? max : value) < min ? min : value;
export const distance = (ax: number, ay: number, bx: number, by: number) => Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay));
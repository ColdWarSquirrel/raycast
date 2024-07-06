import { mapS } from './map.js';
import { canvas } from './canvas.js';
export const player = {
  x: 1.62 * mapS,
  y: 1.94 * mapS,
  direction: 17,
  lookSensitivity: 1,
  speed: 75,
  sprintSpeed: 150
}
export const movePlayer = function (moveAmount: number = 1, direction: number = player.direction, sprint: boolean = false, delta: number = 0.016) {
  let speed = sprint ? player.sprintSpeed : player.speed;
  player.x += Math.sin(direction) * speed * delta * moveAmount;
  player.y += Math.cos(direction) * speed * delta * moveAmount;
  if (player.x > canvas.width) player.x = 0;
  if (player.y > canvas.height) player.y = 0;
  if (player.x < 0) player.x = canvas.width;
  if (player.y < 0) player.y = canvas.height;
}
import { mapX, mapY, mapS, map, fov, FLOOR, SKY, colours } from './map.js';
import { drawRays } from './rays.js';
import { player } from './player.js';
import { RAD, PI } from './math.js';
export const canvas = document.createElement('canvas');
document.body.append(canvas);
export const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

let ratio = mapX / mapY;

canvas.width = (window.innerHeight - canvas.offsetTop) * 0.99; canvas.height = canvas.width * ratio;

export const drawTopDownMap = function () {
  ctx.fillStyle = FLOOR.rgb;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let x: number, y: number, xOffset: number, yOffset: number;
  for (y = 0; y < mapY; y++) {
    for (x = 0; x < mapX; x++) {
      xOffset = x * mapS; yOffset = y * mapS;
      if (map[y * mapX + x] > 0) {
        ctx.fillStyle = colours[map[y * mapX + x] - 1].rgb;
        ctx.fillRect(xOffset, yOffset, mapS, mapS);
      }
    }
  }
}
export const drawAll = function (td: boolean = false) {
  ctx.fillStyle = FLOOR.rgb; // lightish blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (td) {
    drawTopDownMap();
  } else {
    ctx.fillStyle = SKY.rgb; // lightish blue
    ctx.fillRect(0, 0, canvas.width, canvas.height >> 1);
  }
  drawRays(fov, td);
  if (td) drawPlayer();
}

export const drawRay2D = function (ax: number, ay: number, bx: number, by: number, colour: string) {
  ctx.strokeStyle = colour;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.stroke();
}
export const drawRay3D = function (x: number, distance: number, lineWidth: number, colour: string) {
  let lineHeight = (mapS * ctx.canvas.height) / distance;
  if (lineHeight > ctx.canvas.height) lineHeight = ctx.canvas.height;
  ctx.fillStyle = colour;
  ctx.fillRect(x, ctx.canvas.height / 2 - lineHeight / 2, lineWidth, lineHeight);
}

export const drawPlayer = function () {
  ctx.save();
  let angle = player.direction * RAD;
  ctx.fillStyle = "rgb(0, 255, 255)";
  ctx.strokeStyle = "rgb(0, 255, 255)";
  ctx.lineWidth = 2;
  let length = 25;
  ctx.beginPath();
  ctx.arc(player.x, player.y, 5, 0, 2 * PI);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  ctx.lineTo(player.x + (Math.sin(angle) * length), player.y + (Math.cos(angle) * length));
  ctx.stroke();
  ctx.restore();
}
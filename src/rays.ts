import { degreesToRadians, fixAngle, distance, PI, PI2, PI3 } from './math.js';
import { player } from './player.js';
import { mapX, mapY, map, colours, fov, mapS } from './map.js';
import { ctx, drawRay3D, drawRay2D } from './canvas.js';

let previousX = 0;
let previousY = 0;
export const maxCheckingDistance = 16;

export const fireHorizontalRay = function (startX: number = player.x, startY: number = player.y, rayAngle: number = player.direction) {
  let mapx = 0, mapy = 0, mapIndex = 0;
  let dof = 0, xOffset = 0, yOffset = 0
  let rayX = 0, rayY = 0, rayRadian = degreesToRadians(rayAngle);
  let aTan = -1 / Math.tan(rayRadian);

  if (rayRadian > PI) { // up
    rayY = ((startY >> 6) << 6) - 0.0001;
    rayX = (startY - rayY) * aTan + startX;
    yOffset = -64;
    xOffset = -yOffset * aTan;
  }
  if (rayRadian < PI) { // down
    rayY = ((startY >> 6) << 6) + 64;
    rayX = (startY - rayY) * aTan + startX;
    yOffset = 64;
    xOffset = -yOffset * aTan;
  }
  if (rayRadian == 0 || rayRadian == PI) {
    rayX = previousX;
    rayY = previousY;
    dof = maxCheckingDistance;
  }
  while (dof < maxCheckingDistance) {
    mapx = rayX >> 6;
    mapy = rayY >> 6;
    mapIndex = mapy * mapX + mapx;
    if (mapIndex < mapX * mapY && map[mapIndex] > 0) {
      dof = maxCheckingDistance;
    } else {
      rayX += xOffset;
      rayY += yOffset;
      dof += 1;
    }
  }
  previousX = rayX;
  previousY = rayY;
  return {
    x: rayX,
    y: rayY,
    distance: distance(rayX, rayY, startX, startY)
  }
}

export const fireVerticalRay = function (startX: number = player.x, startY: number = player.y, rayAngle: number = player.direction) {
  let mapx = 0, mapy = 0, mapIndex = 0;
  let dof = 0, xOffset = 0, yOffset = 0;
  let rayX = 0, rayY = 0;
  let rayRadian = degreesToRadians(rayAngle);
  let nTan = -Math.tan(rayRadian);
  if (rayRadian > PI2 && rayRadian < PI3) { // left
    rayX = ((player.x >> 6) << 6) - 0.0001;
    rayY = (player.x - rayX) * nTan + player.y;
    xOffset = - 64;
    yOffset = -xOffset * nTan;
  }
  if (rayRadian < PI2 || rayRadian > PI3) { // right
    rayX = ((player.x >> 6) << 6) + 64;
    rayY = (player.x - rayX) * nTan + player.y;
    xOffset = 64;
    yOffset = -xOffset * nTan;
  }
  if (rayRadian == 0 || rayRadian == PI) {
    rayX = previousX;
    rayY = previousY;
    dof = maxCheckingDistance;
  }
  while (dof < maxCheckingDistance) {
    mapx = rayX >> 6;
    mapy = rayY >> 6;
    mapIndex = mapy * mapX + mapx;
    if (mapIndex < mapX * mapY && map[mapIndex] > 0) {
      dof = maxCheckingDistance;
    } else {
      rayX += xOffset;
      rayY += yOffset;
      dof += 1;
    }
  }
  previousX = rayX;
  previousY = rayY;
  return {
    x: rayX,
    y: rayY,
    distance: distance(rayX, rayY, startX, startY)
  }
}

export const fireRay = function (startX: number = player.x, startY: number = player.y, rayAngle: number = player.direction) {
  let horizontalRay = fireHorizontalRay(startX, startY, rayAngle);
  let verticalRay = fireVerticalRay(startX, startY, rayAngle);

  let finalX = 0, finalY = 0, finalDistance = 0;
  let horizontal = false;
  if (horizontalRay.distance < verticalRay.distance) {
    finalX = horizontalRay.x;
    finalY = horizontalRay.y;
    finalDistance = horizontalRay.distance;
    horizontal = true;
  } else {
    finalX = verticalRay.x;
    finalY = verticalRay.y;
    finalDistance = verticalRay.distance;
  }

  let finalAngle = rayAngle;
  //finalDistance = (Math.cos(degreesToRadians(finalAngle)));
  return {
    x: finalX,
    y: finalY,
    distance: finalDistance,
    cardinal: horizontal ? "horizontal" : "vertical"
  }
}

export const drawRays = function (amount: number = 90, topdown: boolean = false) {
  //let playerRadian = degreesToRadians(fixAngle(player.direction));
  let rayAmount = amount;
  let mapIndex = 0;
  let rayAngle = 0, rayRadian = 0;
  let lineWidth = ctx.canvas.width / rayAmount;
  for (let ray = 0; ray < rayAmount; ray++) {
    let colour = 'blue';
    rayAngle = fixAngle(-player.direction + 90 - (rayAmount / 2) + ray);
    rayRadian = degreesToRadians(rayAngle);

    let firedRay = fireRay(player.x, player.y, rayAngle);

    let mapIndexX = (firedRay.x / 64) | 0;
    let mapIndexY = (firedRay.y / 64) | 0;
    mapIndex = mapIndexY * mapX + mapIndexX;
    let colourIndex = map[mapIndex] - 1;
    if (colours[colourIndex]) {
      colour = colours[colourIndex].rgb;
      if (firedRay.cardinal == "horizontal") {
        colour = colours[colourIndex].dark.rgb;
      }
    }
    if (!topdown) {
      drawRay3D(ray * lineWidth, firedRay.distance, lineWidth, colour);
    } else {
      drawRay2D(player.x, player.y, firedRay.x, firedRay.y, colour);
    }
  }
}

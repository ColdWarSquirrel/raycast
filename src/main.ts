"use strict";
import { drawAll } from './canvas.js';
import { ElementInput, KEYBOARD, MOUSE } from './input.js';
import { mapS, toggleTopDown, topdown } from './map.js';
import { degreesToRadians, fixAngle } from './math.js';
import { player, movePlayer } from './player.js';
export { colours } from './map.js';

let delta = 0.016;
let pong = false;

const loop = function (now: number) {
    now;
    let direction = degreesToRadians(player.direction);

    let playerMapCoordsX = (player.x / mapS) | 0;
    let playerMapCoordsY = (player.y / mapS) | 0;
    let sprinting = KEYBOARD.keysDown["ShiftLeft"];
    if (MOUSE.locked) {
        if (MOUSE.movementX != 0) {
            player.direction -= MOUSE.movementX * player.lookSensitivity;
            if (player.direction > 360 || player.direction < 0) player.direction = fixAngle(player.direction);
        }
    }
    MOUSE.movementX = 0;

    if (KEYBOARD.keysDown["ArrowRight"] === true) {
        player.direction -= player.lookSensitivity;
        if (player.direction > 360 || player.direction < 0) player.direction = fixAngle(player.direction);
    }
    if (KEYBOARD.keysDown["ArrowLeft"] === true) {
        player.direction += player.lookSensitivity;
        if (player.direction > 360 || player.direction < 0) player.direction = fixAngle(player.direction);
    }
    if (KEYBOARD.keysDown["KeyW"] === true) {
        movePlayer(1, direction, sprinting, delta);
    }
    if (KEYBOARD.keysDown["KeyS"] === true) {
        movePlayer(-1, direction, sprinting, delta);
    }
    drawAll(topdown);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

new ElementInput(
    document.querySelector<HTMLInputElement>('#topdown')!,
    'click',
    () => { toggleTopDown() }
)
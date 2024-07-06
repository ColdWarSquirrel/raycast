import { canvas, ctx } from './canvas.js';
import { ElementInput, KEYBOARD, MOUSE } from './input.js';
import { colours } from './map.js';
import { degreesToRadians, fixAngle } from './math.js';

const DEFAULT_WIDTH = 15;
const DEFAULT_HEIGHT = 15;
const DEFAULT_SIZE = 64;

let width = DEFAULT_WIDTH;
let height = DEFAULT_HEIGHT;
let size = DEFAULT_SIZE;

let map = new Array<number>(width * height).fill(0);

const init = function () {
  map = new Array(width * height).fill(0);
  canvas.width = width * size;
  canvas.height = height * size;
};

const drawGrid = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  ctx.font = (size * 0.75) + "px serif";
  ctx.lineWidth = 1;
  for (let index = 0; index < map.length; index++) {
    let x = (index % width);
    let y = (index / width | 0);
    let textX = (x + 1) * size - size / 2;
    let textY = (y + 1) * size - size / 2;
    let digit = map[y * width + x];
    if (colours[digit - 1]) {
      ctx.fillStyle = colours[digit - 1].rgb;
      ctx.fillRect(x * size, y * size, size, size);
    }
    ctx.fillStyle = "white";
    ctx.fillText(digit.toString(), textX, textY); 12
    ctx.strokeRect(x * size, y * size, size, size);
  }
};

const loop = function (now: number) {
  now;
  drawGrid();
  requestAnimationFrame(loop);
};

const widthInput = new ElementInput<HTMLInputElement>(
  document.querySelector('#width')!,
  'change',
  function () {
    width = parseInt(document.querySelector<HTMLInputElement>('#width')!.value);
    init();
  }
);
const heightInput = new ElementInput<HTMLInputElement>(
  document.querySelector('#height')!,
  'change',
  function () {
    height = parseInt(document.querySelector<HTMLInputElement>('#height')!.value);
    init();
  }
);
const sizeInput = new ElementInput<HTMLInputElement>(
  document.querySelector('#blocksize')!,
  'change',
  function () {
    size = parseInt(document.querySelector<HTMLInputElement>('#blocksize')!.value);
    init();
  }
);
const outputButton = new ElementInput<HTMLInputElement>(
  document.querySelector('#outputButton')!,
  'click',
  function () {
    const outputMapArray = (() => {
      let output = "["
      map.forEach((element: number, index: number) => {
        if (index % width == 0) output += "\n  ";
        output += element.toString() + ", ";
      });
      output += "\n]";
      return output;
    })();
    document.querySelector<HTMLElement>('#output')!.textContent =
      "const mapX = " + width +
      ";\nconst mapY = " + height +
      ";\nconst mapS = " + size +
      ";\nconst map = " + outputMapArray + ";";
  }
);

KEYBOARD.addKeyEvent('up', (key: string) => {
  if (key.slice(0, 5) == "Digit") {
    let mousex = MOUSE.x - canvas.offsetLeft;
    let mousey = MOUSE.y - canvas.offsetTop;
    let indexX = mousex / size | 0;
    let indexY = mousey / size | 0;
    map[indexY * width + indexX] = parseInt(key.slice(5));
  }
});

init();
requestAnimationFrame(loop);
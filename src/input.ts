export class ElementInput<T extends HTMLElement> {
  public element: T;
  public listener: (element: T, e: Event) => void;
  constructor(element: T, event: string, listener: (element: T, e: Event) => void) {
    this.element = element;
    this.listener = listener;
    this.element.addEventListener(event, (e) => { listener(this.element, e) });
  }
}

export class Mouse {
  public x: number = 0;
  public y: number = 0;
  public previousX: number = 0;
  public previousY: number = 0;
  public movementX: number = 0;
  public movementY: number = 0;
  public locked: boolean = false;
  public target: EventTarget | null = null;
  public buttons: { [key: number]: boolean } = {};
  onmousedown(button: number) { button; }
  onmouseup(button: number) { button; }
  addClickEvent(type: string, event: ((button: number) => any)) {
    if (type === "down") {
      let onmousedown = this.onmousedown;
      this.onmousedown = (button: number) => {
        onmousedown(button);
        event(button);
      }
    } else {
      let onmouseup = this.onmouseup;
      this.onmouseup = (button: number) => {
        onmouseup(button);
        event(button);
      }
    }
  }
  handleMouseDown(e: MouseEvent) {
    this.buttons[e.button] = true;
    this.target = e.target;
    this.onmousedown(e.button);
  }
  handleMouseUp(e: MouseEvent) {
    this.buttons[e.button] = false;
    this.target = e.target;
    this.onmouseup(e.button);
  }
  handleMouseMove(e: MouseEvent) {
    this.previousX = this.x;
    this.previousY = this.y;
    if (!this.locked) {
      this.x = e.clientX;
      this.y = e.clientY;
      this.movementX = this.x - this.previousX;
      this.movementY = this.y - this.previousY;
    } else {
      this.x += e.movementX;
      this.y += e.movementY;
      this.movementX = e.movementX;
      this.movementY = e.movementY;
    }
    this.target = e.target;
  }
  constructor() {
    document.addEventListener('mousemove', (e) => { this.handleMouseMove(e) });
    document.addEventListener('mousedown', (e) => { this.handleMouseDown(e) });
    document.addEventListener('mouseup', (e) => { this.handleMouseUp(e) });
  }
}

export class Keyboard {
  public keysDown: { [key: string]: boolean } = { 0: false };
  public target: EventTarget | null = null;
  constructor() {
    this.addKeyEvent;
    this.handleKeyDown;
    this.handleKeyUp;
    this.onkeydown;
    this.onkeyup;
    this.keysDown;
    document.addEventListener('keydown', (e) => { this.handleKeyDown(e) });
    document.addEventListener('keyup', (e) => { this.handleKeyUp(e) });
  }
  onkeydown(key: string) { key; }
  onkeyup(key: string) { key; }
  addKeyEvent(type: string, event: ((key: string) => any)) {
    if (type === "down") {
      let onkeydown = this.onkeydown;
      this.onkeydown = (key: string) => {
        onkeydown(key);
        event(key);
      }
    } else {
      let onkeyup = this.onkeyup;
      this.onkeyup = (key: string) => {
        onkeyup(key);
        event(key);
      }
    }
  }
  handleKeyDown(e: KeyboardEvent) {
    this.keysDown[e.code] = true;
    this.target = e.target;
    this.onkeydown(e.code);
  }
  handleKeyUp(e: KeyboardEvent) {
    this.keysDown[e.code] = false;
    this.target = e.target;
    this.onkeyup(e.code);
  }
}

export const MOUSE = new Mouse();
export const KEYBOARD = new Keyboard();
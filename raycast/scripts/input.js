export class ElementInput {
    element;
    listener;
    constructor(element, event, listener) {
        this.element = element;
        this.listener = listener;
        this.element.addEventListener(event, (e) => { listener(this.element, e); });
    }
}
export class Mouse {
    x = 0;
    y = 0;
    previousX = 0;
    previousY = 0;
    movementX = 0;
    movementY = 0;
    locked = false;
    target = null;
    buttons = {};
    onmousedown(button) { button; }
    onmouseup(button) { button; }
    addClickEvent(type, event) {
        if (type === "down") {
            let onmousedown = this.onmousedown;
            this.onmousedown = (button) => {
                onmousedown(button);
                event(button);
            };
        }
        else {
            let onmouseup = this.onmouseup;
            this.onmouseup = (button) => {
                onmouseup(button);
                event(button);
            };
        }
    }
    handleMouseDown(e) {
        this.buttons[e.button] = true;
        this.target = e.target;
        this.onmousedown(e.button);
    }
    handleMouseUp(e) {
        this.buttons[e.button] = false;
        this.target = e.target;
        this.onmouseup(e.button);
    }
    handleMouseMove(e) {
        this.previousX = this.x;
        this.previousY = this.y;
        if (!this.locked) {
            this.x = e.clientX;
            this.y = e.clientY;
            this.movementX = this.x - this.previousX;
            this.movementY = this.y - this.previousY;
        }
        else {
            this.x += e.movementX;
            this.y += e.movementY;
            this.movementX = e.movementX;
            this.movementY = e.movementY;
        }
        this.target = e.target;
    }
    constructor() {
        document.addEventListener('mousemove', (e) => { this.handleMouseMove(e); });
        document.addEventListener('mousedown', (e) => { this.handleMouseDown(e); });
        document.addEventListener('mouseup', (e) => { this.handleMouseUp(e); });
    }
}
export class Keyboard {
    keysDown = { 0: false };
    target = null;
    constructor() {
        this.addKeyEvent;
        this.handleKeyDown;
        this.handleKeyUp;
        this.onkeydown;
        this.onkeyup;
        this.keysDown;
        document.addEventListener('keydown', (e) => { this.handleKeyDown(e); });
        document.addEventListener('keyup', (e) => { this.handleKeyUp(e); });
    }
    onkeydown(key) { key; }
    onkeyup(key) { key; }
    addKeyEvent(type, event) {
        if (type === "down") {
            let onkeydown = this.onkeydown;
            this.onkeydown = (key) => {
                onkeydown(key);
                event(key);
            };
        }
        else {
            let onkeyup = this.onkeyup;
            this.onkeyup = (key) => {
                onkeyup(key);
                event(key);
            };
        }
    }
    handleKeyDown(e) {
        this.keysDown[e.code] = true;
        this.target = e.target;
        this.onkeydown(e.code);
    }
    handleKeyUp(e) {
        this.keysDown[e.code] = false;
        this.target = e.target;
        this.onkeyup(e.code);
    }
}
export const MOUSE = new Mouse();
export const KEYBOARD = new Keyboard();
//# sourceMappingURL=input.js.map
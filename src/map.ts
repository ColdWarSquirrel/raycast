export const mapX = 15;
export const mapY = 15;
export const mapS = 64;
export const map = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

export const generateRGBString = (r: number, g: number, b: number) => "rgb(" + r + ", " + g + ", " + b + ")";

export class MapColour {
  public rgb: string;
  public red: number;
  public green: number;
  public blue: number;
  public dark: {
    red: number,
    green: number,
    blue: number,
    rgb: string
  };
  public brightness = 0.75;

  constructor(red: number, green: number, blue: number, brightness?: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.brightness = brightness ?? this.brightness;
    this.rgb = generateRGBString(this.red, this.green, this.blue);
    let darkRed = this.red * this.brightness < 0 ? 0 : this.red * this.brightness;
    let darkGreen = this.green * this.brightness < 0 ? 0 : this.green * this.brightness
    let darkBlue = this.blue * this.brightness < 0 ? 0 : this.green * this.brightness
    this.dark = {
      red: darkRed,
      green: darkGreen,
      blue: darkBlue,
      rgb: generateRGBString(darkRed, darkBlue, darkGreen)
    }
  }
  changeRed(red: number) {
    this.red = red;
    this.rgb = generateRGBString(this.red, this.green, this.blue);
    this.dark.red = this.red * this.brightness < 0 ? 0 : this.red * this.brightness;
    this.dark.rgb = generateRGBString(this.dark.red, this.dark.green, this.dark.blue);
  }
  changeGreen(green: number) {
    this.green = green;
    this.rgb = generateRGBString(this.red, this.green, this.blue);
    this.dark.green = this.green * this.brightness < 0 ? 0 : this.green * this.brightness;
    this.dark.rgb = generateRGBString(this.dark.red, this.dark.green, this.dark.blue);
  }
  changeBlue(blue: number) {
    this.blue = blue;
    this.rgb = generateRGBString(this.red, this.green, this.blue);
    this.dark.blue = this.blue * this.brightness < 0 ? 0 : this.blue * this.brightness;
    this.dark.rgb = generateRGBString(this.dark.red, this.dark.green, this.dark.blue);
  }
}

export const colours = [
  new MapColour(150, 150, 150),
  new MapColour(200, 25, 25),
  new MapColour(25, 200, 25),
  new MapColour(25, 25, 200)
];

export const FLOOR = new MapColour(25, 25, 25);
export const SKY = new MapColour(100, 100, 255);

export const [GRAY, RED, GREEN, BLUE] = colours;

export let topdown = false;
export let fov = 90;

export const toggleTopDown = function (thing: boolean | undefined = undefined) {
  topdown = thing !== undefined ? thing : !topdown;
}
class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(point: Point): Point {
    let newX = this.x + point.x;
    let newY = this.y + point.y;
    return new Point(newX, newY);
  }
}

class CellValue {
  private point: Point;
  private currentValue: any;
  private previousValue: any;

  constructor(point: Point, currentValue: object, previousValue: object = {}) {
    this.point = point;
    this.currentValue = currentValue;
    this.previousValue = previousValue
  }

  setPoint(point: Point): void {
    this.point = point;
  }

  getPoint(): Point {
    return this.point;
  }

  setCurrentValue(currentValue: any): void {
    this.currentValue = currentValue;
  }

  getCurrentValue(): any {
    return this.currentValue;
  }

  setPreviousValue(previousValue: any): void {
    this.previousValue = previousValue;
  }

  getPreviousValue(): any {
    return this.previousValue;
  }
}

class Grid {
  public width: number;
  public height: number;
  public cells: CellValue[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  pointIndex(point: Point): number {
    return (point.y * this.width) + point.x;
  }

  valueAt(point: Point): object {
    const idx = this.pointIndex(point);
    return this.cells[idx];
  }

  setValueAt(point: Point, value: CellValue): void {
    const idx = this.pointIndex(point);
    this.cells[idx] = value;
  }
}

const grid: Grid = new Grid(3, 3);
const point00: Point = new Point(0, 0);
const cell00 = new CellValue(point00, { type: 'empty', character: ' ' }, { type: 'empty', character: ' ' });
grid.setValueAt(point00, cell00);

console.log(grid.valueAt(point00));
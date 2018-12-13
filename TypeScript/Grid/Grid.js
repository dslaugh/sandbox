var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (point) {
        var newX = this.x + point.x;
        var newY = this.y + point.y;
        return new Point(newX, newY);
    };
    return Point;
}());
var CellValue = /** @class */ (function () {
    function CellValue(point, currentValue, previousValue) {
        if (previousValue === void 0) { previousValue = {}; }
        this.point = point;
        this.currentValue = currentValue;
        this.previousValue = previousValue;
    }
    CellValue.prototype.setPoint = function (point) {
        this.point = point;
    };
    CellValue.prototype.getPoint = function () {
        return this.point;
    };
    CellValue.prototype.setCurrentValue = function (currentValue) {
        this.currentValue = currentValue;
    };
    CellValue.prototype.getCurrentValue = function () {
        return this.currentValue;
    };
    CellValue.prototype.setPreviousValue = function (previousValue) {
        this.previousValue = previousValue;
    };
    CellValue.prototype.getPreviousValue = function () {
        return this.previousValue;
    };
    return CellValue;
}());
var Grid = /** @class */ (function () {
    function Grid(width, height) {
        this.cells = [];
        this.width = width;
        this.height = height;
    }
    Grid.prototype.pointIndex = function (point) {
        return (point.y * this.width) + point.x;
    };
    Grid.prototype.valueAt = function (point) {
        var idx = this.pointIndex(point);
        return this.cells[idx];
    };
    Grid.prototype.setValueAt = function (point, value) {
        var idx = this.pointIndex(point);
        this.cells[idx] = value;
    };
    return Grid;
}());
var grid = new Grid(3, 3);
var point00 = new Point(0, 0);
var cell00 = new CellValue(point00, { type: 'empty', character: ' ' }, { type: 'empty', character: ' ' });
grid.setValueAt(point00, cell00);
console.log(grid.valueAt(point00));

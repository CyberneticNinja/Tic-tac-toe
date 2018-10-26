// function greeter(person) {
//     return "Hello, " + person;
// }
//
// let user = "Jane User";
//
// document.body.innerHTML = greeter(user);
// let myNumberVariable: number =1;
// console.log(myNumberVariable);
//
// let mystringvariable: string = 'Hello World';
// console.log(mystringvariable);
//
// let x: [string,   number];
// x = ["hello",   10]; // OK
// x = ["world",   20]; // OK
//
// let count:number = 0;
// while (count < 5) {
//     count++;
//     console.log(count);
// }
var geometry_demo;
(function (geometry_demo) {
    var Vector2D = /** @class */ (function () {
        function Vector2D(x, y) {
            this._x = x;
            this._y = y;
        }
        Vector2D.prototype.toArray = function (callback) {
            callback([this._x, this._y]);
        };
        Vector2D.prototype.length = function () {
            return Math.sqrt(this._x * this._x + this._y * this._y);
        };
        Vector2D.prototype.normalize = function () {
            var len = 1 / this.length();
            this._x *= len;
            this._y *= len;
        };
        return Vector2D;
    }());
    geometry_demo.Vector2D = Vector2D;
})(geometry_demo || (geometry_demo = {}));
var vector = new geometry_demo.Vector2D(2, 3);
vector.normalize();
vector.toArray(function (vectorAsArray) {
    console.log("x: " + vectorAsArray[0] + ", y: " + vectorAsArray[1]);
});

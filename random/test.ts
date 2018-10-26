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

namespace geometry_demo {

    export interface Vector2DInterface {
        toArray(callback: (x: number[]) => void): void;
        length(): number;
        normalize(): void;
    }

    export class Vector2D implements Vector2DInterface {
        private _x: number;
        private _y: number;
        constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }
        public toArray(callback: (x: number[]) => void): void {
            callback([this._x, this._y]);
        }
        public length(): number {
            return Math.sqrt(
                this._x * this._x + this._y * this._y
            );
        }
        public normalize() {
            let len = 1 / this.length();
            this._x *= len;
            this._y *= len;
        }
    }

}

let vector: geometry_demo.Vector2DInterface = new geometry_demo.Vector2D(2,3);
vector.normalize();
vector.toArray(function(vectorAsArray: number[]){
  console.log(`x: ${vectorAsArray[0]}, y: ${vectorAsArray[1]}`);
});

/******************************************************************************************************/
interface Person {
  name: string;
  surname: string;
}

function getFullName(person: Person) {
  return `${person.name} ${person.surname}`;
}


class Employer implements Person { // Named!
  constructor(
    public name: string,
    public surname: string
  ) {}
}


getFullName(new Employer("remo", "jansen")); // OK


const p1: Person = { name: "remo", surname: "jansen" }; // Named!
getFullName(p1); // OK

export class Position {
  private _x : number = 0;
  private _y : number = 0;

  constructor(x : number, y : number){
    if(isNaN(x) || isNaN(y)){
      throw("x === NaN || y === NaN");
    }
    this._x = x;
    this._y = y;
  }

  set x(n : number){
    if(isNaN(n)){
      throw("n === NaN");
    }
    this._x = n;
  }

  set y(n : number){
    if(isNaN(n)){
      throw("n === NaN");
    }
    this._y = n;
  }

  get x() : number {
    return this._x;
  }

  get y() : number {
    return this._y;
  }

  clone() : Position {
    return new Position(this._x, this._y);
  }
}

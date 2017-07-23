export class Position {
  public x : number = 0;
  public y : number = 0;

  constructor(x : number, y : number){
    this.x = x;
    this.y = y;
  }

  clone() : Position {
    return new Position(this.x, this.y);
  }
}

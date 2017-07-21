import { Sprite16x16 } from "./Sprite16x16"
import { PixelRGBA } from "./PixelRGBA"

export class CollisionMap {

  constructor(){
    let height = 15; // 240/16;
    let width = 16; // 256/16;

    this.collisionCellColumns = new Array(width);

    for(let x=0; x<width; x++){
      this.collisionCellColumns[x] = new Array(width);
      for(let y=0; y<height; y++){
        this.collisionCellColumns[x][y] = false; // init as not collision.
      }
    }
  }

  collisionCellColumns:any;

  isCollisionOnPixel(x:number, y:number) : boolean{
    var column = Math.floor(x/16);
    var pixelXIndexInSprite = x % 16;

    var row = Math.floor(y/16);
    var pixelYIndexInSprite = y % 16;

    return this.collisionCellColumns[column][row];
  }

  setCollisionOnCell(spriteColumn : number, spriteRow : number){
    try {
      this.collisionCellColumns[spriteColumn][spriteRow] = true; // TODO should I make sure to .clone() here??
    }
    catch(err) {
      alert(err.message);
    }
  }

  unsetCollisionOnCell(spriteColumn : number, spriteRow : number){
    try {
      this.collisionCellColumns[spriteColumn][spriteRow] = false; // TODO should I make sure to .clone() here??
    }
    catch(err) {
      alert(err.message);
    }
  }
}

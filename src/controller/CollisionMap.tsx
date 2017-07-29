import { Sprite16x16 } from "./Sprite16x16"
import { PixelRGBA } from "./PixelRGBA"

export class CollisionMap {

  constructor(){
    this.collisionCellColumns = new Array(this.width);

    for(let x=0; x<this.width; x++){
      this.collisionCellColumns[x] = new Array(this.width);
      for(let y=0; y<this.height; y++){
        this.collisionCellColumns[x][y] = false; // init as not collision.
      }
    }

    this.createEdges();
  }

  // I don't think that this should be used later.
  private createEdges() : void {
    for(let x=0; x<this.width; x++){
      for(let y=0; y<this.height; y++){
        if(
          x==0 || x==this.width-1 ||
          y==0 || y==this.height-1
        ){
          this.collisionCellColumns[x][y] = true;
        }
      }
    }
  }

  height = 15; // 240/16;
  width = 16; // 256/16;

  collisionCellColumns:any;

  isCollisionOnPixel(x:number, y:number) : boolean{
    var column = Math.floor(x/16);
    var pixelXIndexInSprite = x % 16;

    var row = Math.floor(y/16);
    var pixelYIndexInSprite = y % 16;

    return this.collisionCellColumns[column][row];
  }

  setCollisionOnCell(spriteColumn : number, spriteRow : number){
    if(this.isWithin(spriteColumn, spriteRow)){
      this.collisionCellColumns[spriteColumn][spriteRow] = true; // TODO should I make sure to .clone() here??
    }
  }

  // Makes sure that we try to set/unset within the bounds.
  private isWithin(spriteColumn : number, spriteRow : number) : boolean {
    return spriteColumn < this.width  && spriteColumn >= 0
        && spriteRow    < this.height && spriteRow    >= 0;
  }

  unsetCollisionOnCell(spriteColumn : number, spriteRow : number){
    if(this.isWithin(spriteColumn, spriteRow)){
      this.collisionCellColumns[spriteColumn][spriteRow] = false; // TODO should I make sure to .clone() here??
    }
  }
}

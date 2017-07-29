import { Sprite16x16 } from "./Sprite16x16"
import { PixelRGBA } from "./PixelRGBA"

export class Map {

  constructor(){
    this.spriteColumns = new Array(this.width);

    for(let x=0; x<this.width; x++){
      this.spriteColumns[x] = new Array(this.width);
      for(let y=0; y<this.height; y++){
        this.spriteColumns[x][y] = new Sprite16x16();
      }
    }
  }

  height = 15; // 240/16;
  width = 16; // 256/16;
  spriteColumns : any;

  getPixel(x:number, y:number) : PixelRGBA{
    var column = Math.floor(x/16);
    var pixelXIndexInSprite = x % 16;

    var row = Math.floor(y/16);
    var pixelYIndexInSprite = y % 16;

    let sprite = this.spriteColumns[column][row];

    return sprite.getPixel(pixelXIndexInSprite, pixelYIndexInSprite);
  }

  setPixel(x:number, y:number, pixel : PixelRGBA){
    alert("not implemented");
  }

  // Makes sure that we try to set/unset within the bounds.
  private isWithin(spriteColumn : number, spriteRow : number) : boolean {
    return spriteColumn < this.width  && spriteColumn >= 0
        && spriteRow    < this.height && spriteRow    >= 0;
  }

  drawSprite(spriteColumn : number, spriteRow : number, sprite : Sprite16x16){
    if(this.isWithin(spriteColumn, spriteRow)){
      this.spriteColumns[spriteColumn][spriteRow] = sprite; // TODO should I make sure to .clone() here??
    }
  }
}

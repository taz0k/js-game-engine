import { Sprite16x16 } from "./Sprite16x16"
import { PixelRGBA } from "./PixelRGBA"

export class RoomNonScrolling {

  constructor(){
    let height = 15; // 240/16;
    let width = 16; // 256/16;

    this.spriteColumns = new Array(width);

    for(let x=0; x<width; x++){
      this.spriteColumns[x] = new Array(width);
      for(let y=0; y<height; y++){
        this.spriteColumns[x][y] = new Sprite16x16();
      }
    }
  }

  spriteColumns:any;

  getPixel(x:number, y:number) : PixelRGBA{
    var column = Math.floor(x/16);
    var pixelXIndexInSprite = x % 16;

    var row = Math.floor(y/16);
    var pixelYIndexInSprite = y % 16;

    let sprite = this.spriteColumns[column][row];

    return sprite.getPixel(pixelXIndexInSprite, pixelYIndexInSprite);
  }
}

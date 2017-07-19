import { Sprite16x16 } from "./Sprite16x16"
import { Bitmap } from "./Bitmap"
import { PixelRGBA } from "./PixelRGBA"

export class Tileset{

  /*constructor(bitmap : Bitmap){
    let numberOfColumns = bitmap.getWidth()/16;
    let numberOfRows = bitmap.getHeight()/16;

    this.numberOfSprites = numberOfColumns*numberOfRows;

    this.sprites = new Array(this.numberOfSprites);

    for(let i=0; i<this.numberOfSprites; i++){
      let s = new Sprite16x16();
      this.sprites[i] = s;
      let xOffset = (i % bitmap.getWidth()) * 16;
      let yOffset = Math.floor(i / bitmap.getWidth()) * 16;

      this.addSingleSpriteFromBitmap(xOffset, yOffset, bitmap, s);
    }
  }*/

  constructor(bitmap : Bitmap){
    let numberOfColumns = bitmap.getWidth()/16;
    let numberOfRows = bitmap.getHeight()/16;

    this.numberOfSprites = numberOfColumns*numberOfRows;

    this.sprites = new Array(this.numberOfSprites);

    let i=0;

    for(let y=0; y<numberOfRows; y++){
      for(let x=0; x<numberOfColumns; x++){
        let s = new Sprite16x16();
        this.sprites[i] = s;
        this.addSingleSpriteFromBitmap(x*16, y*16, bitmap, s);
        i++;
      }
    }

    /*for(let i=0; i<this.numberOfSprites; i++){
      let s = new Sprite16x16();
      this.sprites[i] = s;
      let xOffset = (i % bitmap.getWidth()) * 16;
      let yOffset = Math.floor(i / bitmap.getWidth()) * 16;

      this.addSingleSpriteFromBitmap(xOffset, yOffset, bitmap, s);
    }*/
  }

  addSingleSpriteFromBitmap(xOffset:number, yOffset:number, bitmap:Bitmap, sprite:Sprite16x16){
    for(let x=0; x<16; x++){
      for(let y=0; y<16; y++){
        let p = bitmap.getPixel(xOffset+x, yOffset+y);
        sprite.setPixel(x, y, p);
      }
    }
    //s.setPixel(x, y, new PixelRGBA(0,0,0,0));
  }

  sprites:any;
  numberOfSprites:number;

  getSpriteByIndex(i : number) : Sprite16x16 {
    return this.sprites[i];
  }

  getNumberOfSprites(){
    return this.numberOfSprites;
  }

  /*setPixel(x:number, y:number, rgba:PixelRGBA){
    this.pixelColumns[x][y] = rgba.clone();
  }
  getPixel(x:number, y:number) : PixelRGBA{
    return this.pixelColumns[x][y];
  }*/
}

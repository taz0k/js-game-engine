import { PixelRGBA } from "./PixelRGBA"

export class Bitmap {

  constructor(width : number, height : number){
    let r=255;
    let b=255;
    let g=0;
    let a=1;

    this.width = width;
    this.height = height;

    let w=width;
    let h=height;

    this.pixelColumns = new Array(w);

    for(let x=0; x<w; x++){
      this.pixelColumns[x] = new Array(h);
      for(let y=0; y<h; y++){
        this.pixelColumns[x][y] = new PixelRGBA(r,b,g,a);
      }
    }
  }

  width : number;
  height : number;

  /*clone(){
    return new PixelRGBA(this.r ,this.b ,this.g, this.a);
  }*/

  pixelColumns:any;

  setPixel(x:number, y:number, rgba:PixelRGBA){
    this.pixelColumns[x][y] = rgba.clone();
  }
  getPixel(x:number, y:number) : PixelRGBA{
    return this.pixelColumns[x][y];
  }

  getWidth() : number{
    return this.width;
  }
  getHeight() : number{
    return this.height;
  }
}

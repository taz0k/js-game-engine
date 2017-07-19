import { PixelRGBA } from "./PixelRGBA"

export class Sprite16x16{

  constructor(){
    // default color
    let r=Math.round(255*Math.random());
    let g=Math.round(255*Math.random());
    let b=Math.round(255*Math.random());
    let a=255;

    let w=16;
    let h=16;

    this.pixelColumns = new Array(w);

    for(let x=0; x<w; x++){
      this.pixelColumns[x] = new Array(h);
      for(let y=0; y<h; y++){
        this.pixelColumns[x][y] = new PixelRGBA(r,g,b,a);
      }
    }
  }

  pixelColumns:any;

  setPixel(x:number, y:number, rgba:PixelRGBA){
    this.pixelColumns[x][y] = rgba.clone();
  }
  getPixel(x:number, y:number) : PixelRGBA{
    return this.pixelColumns[x][y];
  }
}

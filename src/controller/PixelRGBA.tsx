export class PixelRGBA {

  //constructor({r:number, b:number, g:number, a:number}){
  constructor(r:number, g:number, b:number, a:number){
    this.r=r;
    this.g=g;
    this.b=b;
    this.a=a;
  }

  clone(){
    return new PixelRGBA(this.r ,this.b ,this.g, this.a);
  }

  r:number;
  g:number;
  b:number;
  a:number;
}

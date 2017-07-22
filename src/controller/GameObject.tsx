import { Sprite16x16 } from "./Sprite16x16"
import { PixelRGBA } from "./PixelRGBA"
import { Position } from "./Position"

// This class symbolizes enemies, characters and other
//   such things that move around, animate and collide in the game.
export class GameObject {

  constructor(){
    
  }

  // This is the TOP-LEFT position of an object.
  //   That is, it's not the center or anything such as that.
  position : Position;

  // TODO. These may be temporary because I don't know exactly how
  //  how I should implement this.
  height : number = 16;
  width : number = 16;

}

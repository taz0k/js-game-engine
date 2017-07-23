import { Sprite16x16 } from "./Sprite16x16"
import { PixelRGBA } from "./PixelRGBA"
import { Position } from "./Position"
import { CollisionMap } from "./CollisionMap"

// This class symbolizes enemies, characters and other
//   such things that move around, animate and collide in the game.
export class GameObject {

  constructor(){
    
  }

  // This is the TOP-LEFT position of an object.
  //   That is, it's not the center or anything such as that.
  public position : Position = new Position(0, 0);

  // TODO. These may be temporary because I don't know exactly how
  //  how I should implement this.
  height : number = 16;
  width : number = 16;

  public speed : Position = new Position(1, 1); // TODO temporary default value.

  CollidesWithThisCollisionMap(colmap : CollisionMap) : boolean {
    let collides = false;
    for(let x=0; x<16; x++){
      for(let y=0; y<16; y++){
        if(colmap.isCollisionOnPixel(this.position.x + x, this.position.y + y)){
          collides = true;
        }
      }
    }

    return collides;
  }

  // If this GameObject occupies global [x, y]
  OccupiesThisPixel(x : number, y : number) : boolean {
    return x >= this.position.x
        && x < this.position.x + this.width
        && y >= this.position.y
        && y < this.position.y + this.height;
  }

}

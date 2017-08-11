import { Sprite16x16 } from ".././Sprite16x16"
import { PixelRGBA } from ".././PixelRGBA"
import { Position } from ".././Position"
import { CollisionMap } from ".././CollisionMap"
import { store } from "../.././Flux/stores/Store";
import { GameObject } from ".././GameObject";


// This class symbolizes enemies, characters and other
//   such things that move around, animate and collide in the game.
export class GameObjectDrawer extends GameObject {
  constructor(args : object){
    super(args); // TODO is this right?

    // create a canvas and context and shit and drawMyself upon it then
    //   use draw this created canvas upon the other canvas.
  }

  /*drawMyself(context : CanvasRenderingContext2D, leftPos : number, topPos :number, scale : number){ // TODO remove "scale".
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(leftPos, topPos, 16 * scale, 16 * scale); // TODO 16 should probably not be hardcoded.
  }*/
}

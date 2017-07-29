import { Sprite16x16 } from "./Sprite16x16"
import { PixelRGBA } from "./PixelRGBA"
import { Position } from "./Position"
import { CollisionMap } from "./CollisionMap"
import { store } from "../Flux/stores/Store";
import { GameObject } from "./GameObject";


// This class symbolizes enemies, characters and other
//   such things that move around, animate and collide in the game.
export class PlayerObject extends GameObject {
  constructor(args : object){
    super(args); // pass the args to GameObject's constructor.

    // Subscribe to PLAYED_JUMPED
    store.on("PLAYED_JUMPED", this.doJump_withThisBound);
    console.log(`store.listenerCount("PLAYED_JUMPED")=${store.listenerCount("PLAYED_JUMPED")}`);
  }

  destructor(){
    super.destructor(); // TODO. Is this how you are supposed to do it?
    store.removeListener("PLAYED_JUMPED", this.doJump_withThisBound);
  }

  doJump() : void {
    

    this.speed.y -= 2;
  }

  doJump_withThisBound = this.doJump.bind(this);
}

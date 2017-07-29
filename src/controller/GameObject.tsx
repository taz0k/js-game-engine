import { Sprite16x16 } from "./Sprite16x16"
import { PixelRGBA } from "./PixelRGBA"
import { Position } from "./Position"
import { CollisionMap } from "./CollisionMap"
import { store } from "../Flux/stores/Store";

// This class symbolizes enemies, characters and other
//   such things that move around, animate and collide in the game.
export class GameObject {

  constructor( { x=0, y=0, elasticity=0, slipperinessX=1, slipperinessY=1 } ){
    this.position = new Position(x, y);
    this.elasticity = elasticity;
    this.slipperinessX = slipperinessX;
    this.slipperinessY = slipperinessY;
    this.previousPosition = new Position(x, y);
    store.on("GRAVITY", this.applyGravity_withThisBound);
    //console.log(`store.listenerCount("GRAVITY")=${store.listenerCount("GRAVITY")}`);
  }

  slipperinessX : number;
  slipperinessY: number;

  // JavaScript doesn't have destructors so I must call this manually !!!!
  destructor(){
    store.removeListener("GRAVITY", this.applyGravity_withThisBound);
  }

  applyGravity(){
    this.speed.y += store.gravityAccelerationInPixels;
  }

  applyGravity_withThisBound = this.applyGravity.bind(this); // TODO how is this done more elegantly?

  // This is the TOP-LEFT position of an object.
  //   That is, it's not the center or anything such as that.
  private position : Position;

  // This stores a history of movements
  // TODO. This should be an array or list.
  public previousPosition : Position;

  // TODO. These may be temporary because I don't know exactly how
  //  how I should implement this.
  height : number = 16;
  width : number = 16;

  public speed : Position = new Position(7, 0); // TODO temporary default value.

  // 0 => no bouncing
  // 1 => full bouncing
  // At collision 1-elasticityFactor of speed is lost.
  public elasticity : number;
  private virtualElasticity : number; // for Infinite Bounce Problem

  private isOnGround : boolean; // TODO should this has a default value?

  getVirtualElasticity() : number {
    return this.elasticity;
  }

  // TODO If inAir then gravity should be applied
  inAir() : boolean {
    alert("not implemented!");
    return !this.isOnGround;
  }

  // TODO If hasLanded then gravity should NOT be applied
  hasLanded() : boolean {
    alert("not implemented!");
    return this.isOnGround;
  }

  MoveAccordingToSpeed() : void {
    this.Move(this.speed.x, this.speed.y);
  }

  Move(x : number, y : number) : void {
    if(isNaN(x) || isNaN(y)){
      throw("isNaN(x) || isNaN(y)");
    }

    this.previousPosition = this.position.clone(); // TODO. Do I have to use .clone() here ???

    this.position.x += x;
    this.position.y += y;
  }

  RevertMovement() : void {
    this.position.x = this.previousPosition.x;
    this.position.y = this.previousPosition.y;
  }

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

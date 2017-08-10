import dispatcher from "../dispatchers/Dispatcher";
import { Sprite16x16 } from "../../controller/Sprite16x16";

export function changedSelectedSprite(sprite : Sprite16x16){
  dispatcher.dispatch({
    type: "CHANGED_SELECTED_SPRITE",
    sprite: sprite
  });
}

// signals that this frame is done
//   and that we go to the next frame
export function nextFrame(){
  dispatcher.dispatch({
    type: "NEXT_FRAME"
  });
}

export function playerJumped(){
  dispatcher.dispatch({
    type: "PLAYER_JUMPED"
  });
}

// Signals that gravity should happen now
// So every object that listens to this,
// apply gravity to yourselves.
export function applyGravity(){
  dispatcher.dispatch({
    type: "GRAVITY"
  });
}

// 
export function playerLeft(){
  dispatcher.dispatch({
    type: "PLAYER_LEFT"
  });
}

//
export function playerRight(){
  dispatcher.dispatch({
    type: "PLAYER_RIGHT"
  });
}

//
export function frameWasDrawn(){
  dispatcher.dispatch({
    type: "FRAME_WAS_DRAWN"
  });
}
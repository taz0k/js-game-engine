import dispatcher from "../dispatchers/Dispatcher";
import { Sprite16x16 } from "../controller/Sprite16x16";

export function changedSelectedSprite(sprite : Sprite16x16){
  dispatcher.dispatch({
    type: "CHANGED_SELECTED_SPRITE",
    sprite: sprite
  });
}

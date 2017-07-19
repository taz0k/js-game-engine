import { EventEmitter } from "events";
import { Sprite16x16 } from "../controller/Sprite16x16"
import dispatcher from "../dispatchers/Dispatcher";

class Store extends EventEmitter {
  selectedSprite : Sprite16x16 = new Sprite16x16();

  changeSelectedSprite(sprite : Sprite16x16){
    this.selectedSprite = sprite;

    this.emit("change");
  }

  handleActions(action:any){
    if(action.type === "CHANGED_SELECTED_SPRITE"){
      this.changeSelectedSprite(action.sprite);
    }
  }
}

export const store = new Store;
dispatcher.register(store.handleActions.bind(store));

import { EventEmitter } from "events";
import { Sprite16x16 } from "../controller/Sprite16x16"
import { Map } from "../controller/Map"
import { CollisionMap } from "../controller/CollisionMap"
import dispatcher from "../dispatchers/Dispatcher";

class Store extends EventEmitter {
  selectedSprite : Sprite16x16 = new Sprite16x16();
  currentMap : Map = new Map(); // TODO this "might" be ugly. Storing global vars on a Store??
  currentCollisionMap : CollisionMap = new CollisionMap();
  gravityAccelerationInPixels : number = 2; // TODO. storing public variables like this looks ugly.

  changeSelectedSprite(sprite : Sprite16x16){
    this.selectedSprite = sprite;

    this.emit("change");
  }

  playerJumped(){
    

    this.emit("PLAYER_JUMPED");
  }

  gravity(){
    

    this.emit("GRAVITY");
  }

  handleActions(action:any){
    if(action.type === "CHANGED_SELECTED_SPRITE"){
      this.changeSelectedSprite(action.sprite);
    }else if(action.type === "PLAYER_JUMPED"){
      this.playerJumped();
    }else if(action.type === "GRAVITY"){
      this.gravity();
    }else{
      alert(`Unknown event.type: ${action.type}`);
    }
  }
}

export const store = new Store;
dispatcher.register(store.handleActions.bind(store));

import * as React from "react";
import { Map } from "../controller/Map";
import { store } from "../Flux/stores/Store";
import { GameObject } from "../controller/GameObject";
import { PlayerObject } from "../controller/PlayerObject";
import { Position } from "../controller/Position";
import * as $ from "jquery";
import * as Actions from "../Flux/actions/Actions"

import "./styles/GameObjectLayer.sass"


interface GameObjectLayerState {
  scale : number;
  //context : any;
}
declare var WebGL2D: any;
interface WebGL2D {
    enable(x : any): any;
} // TODO this looks like shit
declare function WebGL2DScreen(x : any) : any;

export default class GameObjectLayer extends React.Component<{}, GameObjectLayerState> {
  constructor(){
    super();
    this.state = {
      scale: 2,
      //context: null
    };
  }

  gameObjects : Array<GameObject> = [
    new GameObject({x: 32, y: 32, elasticity: 0.85, slipperinessX: 0.85, slipperinessY: 0.85}),
    new PlayerObject({x: 100, y: 50, slipperinessX: 0, slipperinessY: 1})
  ];
  _gameObject : GameObject = this.gameObjects[0];
  player : PlayerObject = this.gameObjects[1] as PlayerObject;

  redrawGameObjects(){
    let s = this.state.scale;

    for(let x=0; x<256; x++){
      for(let y=0; y<240; y++){
        let colorValue : number;
        if(this.gameObjects.some(
          (go) => go.OccupiesThisPixel(x, y)
        )){
          colorValue = 255; // draw pixels where the GameObject is as white.
        }else{
          colorValue = 0; // draw where it is not as transparent.
        }

        for(let i_x=0; i_x<s; i_x++){
          for(let i_y=0; i_y<s; i_y++){
            let xPos = x*s+i_x;
            let yPos = y*256*Math.pow(s, 2) + i_y*256*s;
            let pixelPos = (xPos + yPos)*4;

            this.imageData_data[pixelPos+0]   = colorValue;
            this.imageData_data[pixelPos+1]   = colorValue;
            this.imageData_data[pixelPos+2]   = colorValue;
            this.imageData_data[pixelPos+3]   = colorValue;
          }
        }
      }
    }

    // draw everything to a giant imageData.data
    //   then draw it all
    this.context.putImageData( this.imageData, 0, 0 );

    // register that we have drawn a frame
    Actions.frameWasDrawn();
    
  }

  drawSprite(e : any){
    /*if(!this.canvas) {
        this.canvas = $('<canvas/>').css({width:this.width + 'px', height: this.height + 'px'})[0];
        this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
    }*/
    var offX  = (e.offsetX || e.clientX - $(e.target).offset().left);
    var offY  = (e.offsetY || e.clientY - $(e.target).offset().top);

    let spriteColumn = Math.floor((offX / 16)/this.state.scale);
    let spriteRow = Math.floor((offY / 16)/this.state.scale);

    /*var pixelData = this.canvas.getContext('2d').getImageData(offX, offY, 1, 1).data;
    $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);*/
    //console.log(`{${offX}, ${offY}} {${spriteX}, ${spriteY}}`);

    // so draw the damn Sprite already!!

    // First draw to the Map object,
    //  then draw the WHOLE Map again.

    store.currentMap.drawSprite(spriteColumn, spriteRow, store.selectedSprite);

    this.redrawGameObjects();

    /*for(let x=0; x<16; x++){ // TODO. This should be extracted to a method.
      for(let y=0; y<16; y++){
        let p = store.selectedSprite.getPixel(x, y);  // TODO. I get the sprite directly from the store. Dunno if this is stupid.
        context.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
        context.fillRect(spriteColumn*16*s+x*s, spriteRow*16*s+y*s, 1*s, 1*s);
      }
    }*/
  }

  context : any;
  imageData : any = null;
  imageData_data : any = null;
  intervalTimer : any = null;

  executeOneFrameOfTheGame(){

    ///////////////////
    // APPLY GRAVITY //
    ///////////////////

    Actions.applyGravity();


    this.gameObjects.forEach(gameObject => {
      //////////////////
      // MOVE OBJECTS //
      //////////////////

      gameObject.MoveAccordingToSpeed();

      // check if collision

      let colmap = store.currentCollisionMap;

      let oldSpeed : Position = gameObject.speed.clone();

      let collidedInYAxis = false; // for infinity bounce problem
      let speedDown = (gameObject.speed.y > 0 ? true : false); // for infinity bounce problem
      
      let speedFactorX;
      let speedFactorY;

      if(gameObject.CollidesWithThisCollisionMap(colmap)){
        //revert, try to invert speed of x-axis and make a movement.
        gameObject.RevertMovement();
        gameObject.speed.x = -oldSpeed.x;
        gameObject.speed.y = oldSpeed.y;
        gameObject.MoveAccordingToSpeed();

        if(gameObject.CollidesWithThisCollisionMap(colmap)){
          //revert, try to invert y-speed, then try to move again.
          gameObject.RevertMovement();
          gameObject.speed.x = oldSpeed.x;
          gameObject.speed.y = -oldSpeed.y;
          gameObject.MoveAccordingToSpeed();

          if(gameObject.CollidesWithThisCollisionMap(colmap)){
            //revert, try to invert x- and y-speed, then try to move again.
            gameObject.RevertMovement();
            gameObject.speed.x = -oldSpeed.x;
            gameObject.speed.y = -oldSpeed.y;
            gameObject.MoveAccordingToSpeed();

            if(gameObject.CollidesWithThisCollisionMap(colmap)){
              alert("Stuck in wall :'(");
            }else{
              collidedInYAxis = true;
              speedFactorX = gameObject.elasticity;
              speedFactorY = gameObject.elasticity;
            }
          }else{
            collidedInYAxis = true;
            speedFactorY = gameObject.elasticity;

            speedFactorX = gameObject.slipperinessX;
          }
        }else{
          speedFactorX = gameObject.elasticity;

          speedFactorY = gameObject.slipperinessY;
        }

        // Revert Move then apply some stuff, then do the Move again but 100 % correctly
        gameObject.RevertMovement();

        // Elasticity
        gameObject.speed.x *= speedFactorX; // TODO. This only works for specifically "bouncing" objects.
        gameObject.speed.y *= speedFactorY;

        // So do the move that we reverted again.
        //   
        gameObject.MoveAccordingToSpeed();

      }

      this.fixInfinityBounceProblem(gameObject, collidedInYAxis, speedDown);
    });

    //////////
    // DRAW //
    //////////

    this.redrawGameObjects();
  }

  fixInfinityBounceProblem(gameObject : GameObject, collidedInYAxis: boolean, speedDown : boolean){
    if(collidedInYAxis && speedDown){
      let speed = Math.abs(gameObject.speed.y);

      if(speed < 0.5){
        console.log("<0.5");
        gameObject.speed.y *= 0.0;
        // TODO. Signal that this obj has "LANDED" !
      }else if(speed < 1){
        console.log("<1");
        gameObject.speed.y *= 0.7;
      }else if(speed < 2){
        console.log("<2");
        gameObject.speed.y *= 0.8;
      }else if(speed < 3){
        console.log("<3");
        gameObject.speed.y *= 0.9;
      }
    }
  }

  domManipulationAfterRender(){
    // TODO. start timer
    // if it has not already been started
    if(this.intervalTimer == null){
      this.intervalTimer = setInterval(this.executeOneFrameOfTheGame.bind(this), 33);
    }


    let canvas:any = document.getElementById("gameObjectLayerCanvas");
    canvas = WebGL2DScreen(canvas); // this line enables WebGL. Remove it to go back to normal Canvas.
    this.context = canvas.getContext("2d");

    this.imageData = this.context.createImageData(256*this.state.scale, 240*this.state.scale); // only do this once per page
    this.imageData_data  = this.imageData.data;                        // only do this once per page

    this.redrawGameObjects();

    let thisObject = this;

    $('body').keydown(function(e:any) {
      //if space then jump
      if(e.key === " "){
        Actions.playerJumped();
      }else if(e.which === 37){ // left arrow
        Actions.playerLeft();
      }else if(e.which === 39){ // right arrow
        Actions.playerRight();
      }
    });
  }

  componentDidMount(){
    //alert("GameObjectLayer.componentDidMount");
    this.domManipulationAfterRender();
  }

  componentWillUnmount(){
    // Stop timer
    // 
    clearInterval(this.intervalTimer);
    this.intervalTimer = null;

    // Call the descructors of this objects GameObjects.
    this.gameObjects.forEach(go => {
      go.destructor();
    });
  }

  componentDidUpdate(){
    //alert("GameObjectLayer.componentDidUpdate");
    this.domManipulationAfterRender();
  }

  render() {
    return (
      <div className="gameObjectLayerContainer">
        <canvas id="gameObjectLayerCanvas" className="gameObjectLayerCanvas" width={256*this.state.scale} height={240*this.state.scale}></canvas>
      </div>
    );
  }
}

import * as React from "react";
import { CollisionMap } from "../controller/CollisionMap";
import { store } from "../Flux/stores/Store";
import * as $ from "jquery";

import "./styles/CollisionMap.sass"


interface CollisionMapComponentState {
  scale : number;
  //context : any;
}
declare var WebGL2D: any;
interface WebGL2D {
    enable(x : any): any;
} // TODO this looks like shit
declare function WebGL2DScreen(x : any) : any;

export default class CollisionMapComponent extends React.Component<{}, CollisionMapComponentState> {
  constructor(){
    super();
    this.state = {
      scale: 2,
      //context: null
    };
  }

  redrawMap(){
    let map = store.currentCollisionMap;

    let s = this.state.scale;

    for(let x=0; x<256; x++){
      for(let y=0; y<240; y++){
        let isCollision = map.isCollisionOnPixel(x, y);
        /*let fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`
        this.context.fillStyle = fillStyle;
        this.context.fillRect(x*s, y*s, 1*s, 1*s);*/

        //let pixelPos = (x*s+y*256*Math.pow(s, 2))*4;

        for(let i_x=0; i_x<s; i_x++){
          for(let i_y=0; i_y<s; i_y++){
            let xPos = x*s+i_x;
            let yPos = y*256*Math.pow(s, 2) + i_y*256*s;
            let pixelPos = (xPos + yPos)*4;

            let value;
            if(isCollision){
              value = 255; // draw collision as white
            }else{
              value = 0; // draw not collision as transparent
            }

            this.imageData_data[pixelPos+0]   = value;
            this.imageData_data[pixelPos+1]   = value;
            this.imageData_data[pixelPos+2]   = value;
            this.imageData_data[pixelPos+3]   = value;
          }
        }
      }
    }

    this.context.putImageData( this.imageData, 0, 0 );

    // draw everything to a giant imageData.data
    //   then draw it all
  }


  setCollisionOnCell(e : any, setIfTrueElseUnset : boolean){

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

    if(setIfTrueElseUnset){
      store.currentCollisionMap.setCollisionOnCell(spriteColumn, spriteRow);
    }else{
      store.currentCollisionMap.unsetCollisionOnCell(spriteColumn, spriteRow);
    }

    this.redrawMap();
  }

  context : any;
  imageData : any = null;
  imageData_data : any = null;

  domManipulationAfterRender(){
    let canvas:any = document.getElementById("collisionMapCanvas");
    canvas = WebGL2DScreen(canvas); // this line enables WebGL. Remove it to go back to normal Canvas.
    this.context = canvas.getContext("2d");

    this.imageData = this.context.createImageData(256*this.state.scale, 240*this.state.scale); // only do this once per page
    this.imageData_data  = this.imageData.data;                        // only do this once per page*/

    this.redrawMap();

    let thisObject = this;

    $('#collisionMapCanvas').mousemove(function(e:any) {
      if(e.which === 1){
        thisObject.setCollisionOnCell(e, true);
      }else if(e.which === 3){
        thisObject.setCollisionOnCell(e, false);
      }
    });

    $('#collisionMapCanvas').click(function(e:any) {
      thisObject.setCollisionOnCell(e, true);
    });

    $('#collisionMapCanvas').contextmenu(function(e:any) {
      thisObject.setCollisionOnCell(e, false);
      e.preventDefault();
    });
  }

  componentDidMount(){
    //alert("CollisionMapComponent.componentDidMount");
    this.domManipulationAfterRender();
  }
  
  componentDidUpdate(){
    //alert("CollisionMapComponent.componentDidUpdate");
    this.domManipulationAfterRender();
  }

  componentWillUnmount(){
    //alert("CollisionMapComponent.componentWillUnmount");
  }

  render() {
    //alert("CollisionMapComponent.render");
    return (
      <div className="collisionMapContainer">
        <canvas id="collisionMapCanvas" className="collisionMapCanvas" width={256*this.state.scale} height={240*this.state.scale}></canvas>
        <button>Show grid</button>
        <button>Load map</button>
        <button>Fill map with sprite</button>
      </div>
    );
  }
}

import * as React from "react";
import { Map } from "../controller/Map";
import { store } from "../Flux/stores/Store";
import * as $ from "jquery";

import "./styles/GameWindow.sass"


interface GameWindowState {
  scale : number;
  //context : any;
}
declare var WebGL2D: any;
interface WebGL2D {
    enable(x : any): any;
} // TODO this looks like shit
declare function WebGL2DScreen(x : any) : any;

export default class GameWindow extends React.Component<{}, GameWindowState> {
  constructor(){
    super();
    this.state = {
      scale: 2,
      //context: null
    };
  }

  redrawMap(){
    let map = store.currentMap;

    let s = this.state.scale;

    for(let x=0; x<256; x++){
      for(let y=0; y<240; y++){
        let p = map.getPixel(x, y);
        /*let fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`
        this.context.fillStyle = fillStyle;
        this.context.fillRect(x*s, y*s, 1*s, 1*s);*/

        //let pixelPos = (x*s+y*256*Math.pow(s, 2))*4;

        for(let i_x=0; i_x<s; i_x++){
          for(let i_y=0; i_y<s; i_y++){
            let xPos = x*s+i_x;
            let yPos = y*256*Math.pow(s, 2) + i_y*256*s;
            let pixelPos = (xPos + yPos)*4;

            this.imageData_data[pixelPos+0]   = p.r;
            this.imageData_data[pixelPos+1]   = p.g;
            this.imageData_data[pixelPos+2]   = p.b;
            this.imageData_data[pixelPos+3]   = p.a;
          }
        }
      }
    }

    this.context.putImageData( this.imageData, 0, 0 );

    // draw everything to a giant imageData.data
    //   then draw it all
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

    this.redrawMap();

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

  domManipulationAfterRender(){
    let canvas:any = document.getElementById("gameCanvas");
    canvas = WebGL2DScreen(canvas); // this line enables WebGL. Remove it to go back to normal Canvas.
    this.context = canvas.getContext("2d");

    this.imageData = this.context.createImageData(256*this.state.scale, 240*this.state.scale); // only do this once per page
    this.imageData_data  = this.imageData.data;                        // only do this once per page*/

    this.redrawMap();

    let thisObject = this;

    $('#gameCanvas').mousemove(function(e:any) {
      if(e.which === 1){
        thisObject.drawSprite(e);
      }
    });

    $('#gameCanvas').click(function(e:any) {
      thisObject.drawSprite(e);
    });
  }

  componentDidMount(){
    //alert("GameWindow.componentDidMount");
    this.domManipulationAfterRender();
  }

  componentDidUpdate(){
    //alert("GameWindow.componentDidUpdate");
    this.domManipulationAfterRender();
  }

  render() {
    return (
      <div className="gameWindowContainer">
        <canvas id="gameCanvas" className="gameCanvas" width={256*this.state.scale} height={240*this.state.scale}></canvas>
        <button>Show grid</button>
        <button>Load map</button>
        <button>Fill map with sprite</button>
      </div>
    );
  }
}

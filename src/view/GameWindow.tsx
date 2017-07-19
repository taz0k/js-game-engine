import * as React from "react";

import { RoomNonScrolling } from "../controller/RoomNonScrolling";

import { store } from "../stores/Store";

import "./styles/GameWindow.sass"


interface GameWindowState {
  scale : number;
}


export default class GameWindow extends React.Component<{}, GameWindowState> {
  constructor(){
    super();
    this.state = {
      scale: 2
    };
  }

  setPixel(x:number, y:number){
    /*var id = myContext.createImageData(1,1); // only do this once per page
    var d  = id.data;                        // only do this once per page
    d[0]   = r;
    d[1]   = g;
    d[2]   = b;
    d[3]   = a;
    myContext.putImageData( id, x, y );*/
  }

  componentDidMount(){
    let room = new RoomNonScrolling();

    let s = this.state.scale;

    //var resolution = 500;

    let canvas:any = document.getElementById("gameCanvas");
    let context = canvas.getContext("2d");

    context.fillStyle = "rgba(0,255,0,1)";
    //context.fillRect(0, 0, 256, 240);

    for(let x=0; x<256; x++){
      for(let y=0; y<240; y++){
        let p = room.getPixel(x, y);
        let fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`
        context.fillStyle = fillStyle;
        context.fillRect(x*s, y*s, 1*s, 1*s);
      }
    }

    let draw = function(e : any){
      /*if(!this.canvas) {
          this.canvas = $('<canvas/>').css({width:this.width + 'px', height: this.height + 'px'})[0];
          this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
      }*/
      var offX  = (e.offsetX || e.clientX - eval("$")(e.target).offset().left);
      var offY  = (e.offsetY || e.clientY - eval("$")(e.target).offset().top);

      let spriteX = Math.floor((offX / 16)/s);
      let spriteY = Math.floor((offY / 16)/s);

      /*var pixelData = this.canvas.getContext('2d').getImageData(offX, offY, 1, 1).data;
      $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);*/
      //console.log(`{${offX}, ${offY}} {${spriteX}, ${spriteY}}`);

      // so draw the damn Sprite already!!

      for(let x=0; x<16; x++){ // TODO. This should be extracted to a method.
        for(let y=0; y<16; y++){
          let p = store.selectedSprite.getPixel(x, y);  // TODO. I get the sprite directly from the store. Dunno if this is stupid.
          context.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
          context.fillRect(spriteX*16*s+x*s, spriteY*16*s+y*s, 1*s, 1*s);
        }
      }
    }

    eval("$")('#gameCanvas').mousemove(function(e:any) {
      if(e.which === 1){
        draw(e);
      }
    });

    eval("$")('#gameCanvas').click(function(e:any) {
      draw(e);
    });
  }

  render() {
    return (
      <div className="gameWindowContainer">
        <canvas id="gameCanvas" className="gameCanvas" width={256*this.state.scale} height={240*this.state.scale}></canvas>
        <button>Show grid</button>
        <button>Load map</button>
      </div>
    );
  }
}

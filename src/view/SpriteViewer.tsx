import * as React from "react";
import { Sprite16x16 } from "../controller/Sprite16x16";
import { store } from "../stores/Store";

import "./styles/SpriteViewer.sass"

interface SpriteViewerState {
  scale: number;
  width: number;
  height: number;
  sprite: Sprite16x16;
}

export default class SpriteViewer extends React.Component<{}, SpriteViewerState> {
  constructor(){
    super();
    let scale = 8;
    this.state = {
      scale: scale,
      width: 16*scale,
      height: 16*scale,
      sprite: store.selectedSprite
    }
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

  componentWillMount(){
    store.on("change", () => {
      //console.log("SpriteViewer change event;");
      this.setState({
        sprite: store.selectedSprite
      });
      this.drawSprite(store.selectedSprite);
    });
  }

  componentDidMount(){
    //console.log("SpriteViewer.componentDidMount();");
    //let sprite = new Sprite16x16();
    this.drawSprite(this.state.sprite);
  }

  drawSprite(sprite : Sprite16x16){
    //console.log("SpriteViewer.drawSprite();");

    let canvas : any = document.getElementById("spriteViewerCanvas");
    let context = canvas.getContext("2d");

    let scale = this.state.scale;

    for(let x=0; x<16; x++){
      for(let y=0; y<16; y++){
        let p = sprite.getPixel(x, y);
        context.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
        context.fillRect(x*scale, y*scale, scale, scale);
      }
    }
  }

  render() {
    return (
      <div className="spriteViewerContainer">
        <canvas id="spriteViewerCanvas" className="spriteViewerCanvas" width={this.state.width} height={this.state.height}></canvas>
      </div>
    );
  }
}

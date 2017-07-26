import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles/Tile.sass"
import { Sprite16x16 } from "../../controller/Sprite16x16"

import * as Actions from "../../Flux/actions/Actions"

interface TileProps extends React.Props<any> {
  sprite: Sprite16x16;
  scale: number;
}

interface TileState {
  //tileset: Tileset;
}

export default class Tile extends React.Component<TileProps, TileState> {
  componentDidMount(){
    let sprite = this.props.sprite;

    let canvasDomElement : any = ReactDOM.findDOMNode(this);
    let context = canvasDomElement.getContext("2d");

    let s = this.props.scale;

    for(let x=0; x<16; x++){
      for(let y=0; y<16; y++){
        let p = sprite.getPixel(x, y);
        context.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
        context.fillRect(x*s, y*s, 1*s, 1*s);
      }
    }
  }

  // TODO this is very much not OO.
  // The Tile preview should ideally render itself getting passed a Sprite object
  handleOnClick(e : any){
    Actions.changedSelectedSprite(this.props.sprite);

    /*let canvas : any = document.getElementById("spriteViewerCanvas");
    let context = canvas.getContext("2d");

    let scale = 5; // TODO this size should ideally be on the SpritePreviewer object/class

    for(let x=0; x<16; x++){
      for(let y=0; y<16; y++){
        let p = this.props.sprite.getPixel(x, y);
        context.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
        context.fillRect(x*scale, y*scale, scale, scale);
      }
    }*/
  }

  render() {
    let s = this.props.scale;
    return (
      <canvas onClick={this.handleOnClick.bind(this)} className="tilesetViewerTile" width={16*s} height={16*s}></canvas>
    );
  }
}

import * as React from "react";

import { Bitmap } from "../controller/Bitmap";
import { PixelRGBA } from "../controller/PixelRGBA";
import { Tileset } from "../controller/Tileset";

import "./styles/TilesetLoader.sass"

interface TilesetLoaderProps extends React.Props<any> {
  onTilesetLoaded: any;
}

/*
 * My task is to load an image into a "Bitmap" object.
 */
export default class TilesetLoader extends React.Component<TilesetLoaderProps, {}> {
  loadTileset(){
    let img:any = document.getElementById('tilesetImgTag');

    if(img.width % 16 !== 0 || img.height % 16 !== 0){
      //throw("hej");
      alert(`Bitmap has wrong dimensions. ${img.width}x${img.height}`);
    }

    let canvas = document.createElement('canvas');

    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    let bitmap = new Bitmap(canvas.width, canvas.height);

    for(let x=0; x<canvas.width; x++){
      for(let y=0; y<canvas.height; y++){
        let pixelData = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
        let r=pixelData[0];
        let g=pixelData[1];
        let b=pixelData[2];
        let a=pixelData[3];

        bitmap.setPixel(x, y, new PixelRGBA(r,g,b,a));
      }
    }

    let tileset = new Tileset(bitmap);

    this.props.onTilesetLoaded(tileset);
  }

  render() {
    return (
      <div className="tilesetLoaderContainer">
        <img onLoad={this.loadTileset.bind(this)} id="tilesetImgTag" src="quickman.png" />
      </div>
    );
  }
}

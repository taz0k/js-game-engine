import * as React from "react";

import { Tileset } from "../controller/Tileset"
import TilesetLoader from "./TilesetLoader"
import Tile from "./TilesetViewer/Tile"
import TileRow from "./TilesetViewer/TileRow"

import "./styles/TilesetViewer.sass"

interface TilesetViewerProps extends React.Props<any> {
  columns: number;
}

interface TilesetViewerState {
  tileset: Tileset;
  scale: number;
}

export default class TilesetViewer extends React.Component<TilesetViewerProps, TilesetViewerState> {
  constructor(props : any){
    super(props);

    this.state = {
      tileset: null,
      scale: 1 // TODO: implement.
    };
  }

  loadTileset(tileset : Tileset){
    this.setState( { tileset: tileset } );
  }

  getTiles() : any {
    let tileRows = []
    //let tiles : any = [];
    let columns : number = this.props.columns;
    let sprites : number = this.state.tileset.getNumberOfSprites();
    let i = 0; // counts how many sprites we've drawn yet.

    while(i<sprites){
      let tileElementsInRow = [];
      for(let x=0; x<columns && i<sprites; x++){
        tileElementsInRow.push(<Tile sprite={this.state.tileset.getSpriteByIndex(i)} scale={this.state.scale} />);
        i++;
      }
      tileRows.push(<TileRow>{tileElementsInRow}</TileRow>)

      //console.log(`i=${i}`);
    }

    return tileRows;
  }

  render() {
    return (
      <div>
        <div className="tilesetViewerContainer">
          { this.state.tileset !== null ? this.getTiles() : null }
        </div>
        { this.state.tileset === null ? <TilesetLoader onTilesetLoaded={this.loadTileset.bind(this)} /> : null }
      </div>
    );
  }
}

import * as React from "react";
import { Link } from "react-router"

import TODO from "./../TODO";


import GameWindow from "../../view/GameWindow"
//import TilesetViewer from "../view/TilesetViewer"
//import SpriteViewer from "../view/SpriteViewer"
//import TilesetLoader from "../view/TilesetLoader"
import CollisionMapComponent from "../../view/CollisionMapComponent"

//import "./styles/CollisionEditorRoute.sass"

export default class CollisionEditorRoute extends React.Component<{}, {}> {
  render() {
    return (
      <div style={{
        flex: '1',
        overflowY: 'scroll'
      }}>

        {/*<TilesetLoader />*/}
        <div style={{
          display: 'flex',
          alignItems: "flex-start",
          justifyContent: 'space-around', 
          borderStyle: 'solid',
          borderWidth: '2px'
        }}>
          <div>
            Left-clicking creates solid terrain. Right-clicking removes solid terrain.
          </div>
        </div>

        <div style={{
          position: "relative"
        }}>
          <GameWindow />
          <CollisionMapComponent />
        </div>

        <TODO />
      </div>
    );
  }
}
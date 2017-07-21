import * as React from "react";
import { Link } from "react-router"

import TODO from "./TODO";


import GameWindow from "../view/GameWindow"
import TilesetViewer from "../view/TilesetViewer"
import SpriteViewer from "../view/SpriteViewer"
import TilesetLoader from "../view/TilesetLoader"

//import "./styles/CollisionEditorRoute.sass"

export default class MapEditorRoute extends React.Component<{}, {}> {
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
          <TilesetViewer columns={8} />
          <SpriteViewer />
        </div>

        <GameWindow />

        <TODO />
      </div>
    );
  }
}
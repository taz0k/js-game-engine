import * as React from "react";
import { Link } from "react-router"

import GameWindow from "../../view/GameWindow"
//import TilesetViewer from "../view/TilesetViewer"
//import SpriteViewer from "../view/SpriteViewer"
//import TilesetLoader from "../view/TilesetLoader"
import CollisionMapComponent from "../../view/CollisionMapComponent"
import FpsCounterComponent from "../../view/FpsCounterComponent"
import GameObjectLayer from "../../view/GameObjectLayer"

//import "./styles/CollisionEditorRoute.sass"

export default class DemoRoute extends React.Component<{}, {}> {
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
            Demo!!!!!!!!!!!!!!!!
          </div>
        </div>

        <div style={{
          position: "relative"
        }}>
          <GameWindow />
          <GameObjectLayer />
        </div>
        <FpsCounterComponent />
      </div>
    );
  }
}
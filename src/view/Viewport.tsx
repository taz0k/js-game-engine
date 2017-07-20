import * as React from "react";

import "./styles/Viewport.sass";

import TODO from "./TODO";


import GameWindow from "../view/GameWindow"
import TilesetViewer from "../view/TilesetViewer"
import SpriteViewer from "../view/SpriteViewer"
import TilesetLoader from "../view/TilesetLoader"

interface ViewportState {
  verboseKeyboard: boolean;
}

export default class Viewport extends React.Component<{}, ViewportState> {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="viewport">
        <div style={{
          flex: '1',
          minWidth: '0',
          minHeight: '0',
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'row'
        }}>
          {/*<Header />*/}
          {/*<NavBar />*/}

          <div style={{
            /*overflowY: 'scroll'*/
          }}>
            <div className="menuItem isLink">
              Draw tiles
            </div>
            <div className="menuItem isLink">
              Draw collision
            </div>
            <div className="menuItem isLink">
              Demo (studsboll)
            </div>

            {Array.apply(0, Array(15)).map((x:any, i:any) =>
              <div className="menuItem">
                <div style={{height: '20px'}}></div>
              </div>
            )}

          </div>

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
        </div>
        {/*<History />*/}
      </div>
    );
  }
}

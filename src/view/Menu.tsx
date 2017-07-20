import * as React from "react";
//import { RoomNonScrolling } from "../controller/RoomNonScrolling";
//import { store } from "../stores/Store";
//import * as $ from "jquery";

import "./styles/Menu.sass"

export default class Menu extends React.Component<{}, {}> {
  render() {
    return (
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
    );
  }
}



          
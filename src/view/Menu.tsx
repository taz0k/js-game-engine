import * as React from "react";
import { Link } from "react-router"

import "./styles/Menu.sass"

export default class Menu extends React.Component<{}, {}> {
  render() {
    return (
      <div style={{
        /*overflowY: 'scroll'*/
      }}>
        <div className="menuItem isLink">
          <a href="#/">Draw tiles</a>
        </div>
        <div className="menuItem isLink">
          <Link to="collisions">Draw collision</Link>
        </div>
        <div className="menuItem isLink">
          <Link to="demo">Demo (studsboll)</Link>
        </div>
        <div className="menuItem isLink">
          <Link to="todo">Todo</Link>
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



          
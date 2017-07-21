import * as React from "react";

import "./styles/Viewport.sass";

import Menu from "../view/Menu"

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

          <Menu />

          {this.props.children}

        </div>
      </div>
    );
  }
}

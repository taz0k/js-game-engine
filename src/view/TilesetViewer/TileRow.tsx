import * as React from "react";

import "./styles/TileRow.sass"

interface TileRowProps extends React.Props<any> {

}

interface TileRowState {

}

export default class TileRow extends React.Component<TileRowProps, TileRowState> {
  render() {
    return (
      <div className="tileRow">
        {this.props.children}
      </div>
    );
  }
}

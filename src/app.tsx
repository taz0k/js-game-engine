import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Viewport from "./view/Viewport";
import CollisionEditorRoute from "./view/CollisionEditorRoute";
import MapEditorRoute from "./view/MapEditorRoute";
import DemoRoute from "./view/DemoRoute";

const app = document.getElementById('app');
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Viewport}>
      <IndexRoute component={MapEditorRoute}></IndexRoute>
      <Route path="collisions" component={CollisionEditorRoute}></Route>
      <Route path="demo" component={DemoRoute}></Route>
    </Route>
  </Router>,
app);

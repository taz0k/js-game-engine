import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Viewport from "./view/Viewport";

const app = document.getElementById('app');
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Viewport}>
      <IndexRoute></IndexRoute>
      <Route path="collisions"></Route>
      <Route path="demo"></Route>
    </Route>
  </Router>,
app);

import * as React from "react";

export default class TODO extends React.Component {
  render() {
    return (
      <pre>{`
= Good to know =

== git ==

* git pull --prune
    branches that have been removed from GitHub are
    removed from local repository.

= TODO =

* What is "get pull", "get sync" and "git push"?

* css modules in React:
    https://javascriptplayground.com/blog/2016/07/css-modules-webpack-react/

* "ellipsis" "spread operator".

* componentDidMount only runs ONE time, so I have misinterpreted what it does
    I wanted something that runs EVERY time after render().

* getPixel(x, y) from image
    https://stackoverflow.com/questions/8751020/how-to-get-a-pixels-x-y-coordinate-color-from-an-image
    http://jsfiddle.net/9SEMf/622/


* use "Jade"?
* What the hell does this do:
    let { params } = this.props;
    that is the wrapping in {}.
* Learn about:
    * generator functions
    * async/await
    * "promises"
* Inherit all props from parent ??
* GIT with VSCode.
* I have come to the conclusion that inline-block sucks and should,
    if possible, be changed to inline-flex.
* Add "linting" to everything.
* Har fortfarande problem med line-height som lägger till avstånd i y-led
    trots att jag använder inline-flex istället för inline-block.
* npm install jquery
  npm install Bootstrap
    so that I can use "$"
* Maybe TilesetLoader should have a prop "src".
    so that one can easily load files with it super independently/modular.



    `}</pre>
    );
  }
}

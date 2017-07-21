import * as React from "react";

export default class TODO extends React.Component {
  render() {
    return (
      <pre>{`
= Good to know =

== git ==

* installed "git-upload" npm package globally
    now I can stage, commit, and push at once with:
      gitu "commit message"

* git pull --rebase origin master
    if master has had commits since you branched, now you get those updates too.

* git ls-remote --heads origin
    ger mig en lista på vilka branches som finns på GitHub (förutsatt att origin=GitHub)
    otherwise one can try "git branch -a", "git branch -r" or "git remote show origin"

* git pull --prune
  git branch -d local_branch_name
    branches that have been removed from GitHub are
    removed from local repository.

= TODO =

* In the MapEditor I draw/edit the canvas object directly which SUCKS(!!!!!)
    What I should do instead is to make changes to my Game Engine Objects.
    The Game Engine and the View should be decoupled!!

* Use latest react-router.
    I am using version 2 but there is a very different version 4.
    The "history" package may be removed with version 4??

* På Firefox så ritas det ut tiles oavsett om man trycker på mouseLeft eller inte.

* What the fuck? Hoppa mellan branches i VSCode gör ingen skillnad på filerna.
    Är det fel?
    Nu funkar det igen???

* If I want to download a branch which I don't have 

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

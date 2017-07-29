import * as React from "react";

export default class TodoRoute extends React.Component {
  render() {
    return (
      <pre style={{
        flex: '1',
        overflowY: 'scroll'
      }}>{`
= Good to know =

== git ==

* go to specific commit with:
    git checkout commit_hash

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

* Error msg
    WARNING: Too many active WebGL contexts. Oldest context will be lost.

* A PlayerObject usually has slipperinessY = 1 and slipperinessX = 0.
    For "ice physics" slipperinessY = 1 and slipperinessX > 0.

* NaN is bullshit in JavaScript:
    NaN === NaN;        // false
    Number.NaN === NaN; // false
    isNaN(NaN);         // true
    isNaN(Number.NaN); // true

* Should probably try to remove as much jQuery as possible.
    I can insert functions are event-listeners in the HTML you know.

* Fix:
    (node) warning: possible EventEmitter memory leak detected.
    11 listeners added. Use emitter.setMaxListeners() to increase limit.

    when components unload has to "destruct" GameObjects !!!

* gravity application should be moved into GameObject

* elasticity should be moved into GameObject

* Add so keys can add speed to GameObject.

* When GameObjects collides, it should test to invert the speed
    of first the x-axis and try if this direction will get it "out of collision"
      if that works super!
    else try inverst speed of y-axis -||-
    else invert both axis -||-

* Maybe GameObjects should keep a history of where they wer the last frames.
    If they get stuck in wall the simply move back until they get un-stuck.

* "new-frame" event
    that stuff including GameObjects can subscribe to.

* I now have two Canvas over each other.
    I must change that to one canvas.
    So that it just renders two passes or whatever.
    Should be doable.

* Possible optimization improvements:
    * Each Map has a 2d array of POINTERS to Sprite objects.
        Then each Sprite object calculates and stores a
        context.createImageData(16, 16) so that it can be drawn with
        context.putImageData(...)

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

* What the hell does this do:
    let { params } = this.props;
    that is the wrapping in {}.

* Learn about:
    * generator functions
    * async/await
    * "promises"

* Inherit all props from parent ??

* I have come to the conclusion that inline-block sucks and should,
    if possible, be changed to inline-flex.

* Add "linting" to everything.

* Har fortfarande problem med line-height som lägger till avstånd i y-led
    trots att jag använder inline-flex istället för inline-block.

* Maybe TilesetLoader should have a prop "src".
    so that one can easily load files with it super independently/modular.



    `}</pre>
    );
  }
}

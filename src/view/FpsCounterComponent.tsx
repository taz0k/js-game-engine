import * as React from "react";
import * as Actions from "../Flux/actions/Actions"
import { FpsCounter } from "../controller/FpsCounter"

//import "./styles/FpsCounterComponent.sass"


interface FpsCounterComponentState {
  //scale : number;
  //context : any;
}

export default class FpsCounterComponent extends React.Component<{}, FpsCounterComponentState> {
  private fpsCounter : FpsCounter;

  constructor(){
    super();
    this.state = {
      //scale: 2,
      //context: null
    };
  }

  render() {
    return (
      <div>
        <span>FPS: </span>
        <span id="FPS">3</span>
      </div>
    );
  }

  domManipulationAfterRender(){
    let FpsElement = document.getElementById("FPS");
    this.fpsCounter = new FpsCounter(FpsElement);

  }

  componentDidMount(){
    this.domManipulationAfterRender();
  }
  
  componentDidUpdate(){
    this.domManipulationAfterRender();
  }
}

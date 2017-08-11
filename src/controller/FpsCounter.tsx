import { store } from "../Flux/stores/Store";

export class FpsCounter {

  private framesToAverageOut : number = 30;
  private elementToDrawFpsOn : any; //TODO. should not be any
  private millisPassedSinceLastFpsDrawn : number = 0;
  private millisWasWhatLastTime : number = 0;
  private framesThatWeHaveCollected : number = 0;

  constructor(elementToDrawFpsOn : any){ //TODO. should not be any
    this.elementToDrawFpsOn = elementToDrawFpsOn;

    store.on("FRAME_WAS_DRAWN", this.whenFrameWasDrawn_withThisBound);
  }

  whenFrameWasDrawn_withThisBound = this.whenFrameWasDrawn.bind(this);

  // this should probably be called when an EVENT happens.
  public whenFrameWasDrawn() : void {
    let absoluteMillis = Date.now();
    let deltaMillis = absoluteMillis - this.millisWasWhatLastTime;
    this.millisWasWhatLastTime = absoluteMillis;
    this.millisPassedSinceLastFpsDrawn += deltaMillis;
    this.framesThatWeHaveCollected++;
    if(this.framesThatWeHaveCollected >= this.framesToAverageOut){ // it's time to count and draw fps.
      let fps = 1000 * this.framesThatWeHaveCollected/this.millisPassedSinceLastFpsDrawn;
      // then draw this onto this.elementToDrawFpsOn
      this.elementToDrawFpsOn.innerHTML = fps.toFixed(1);

      // Reset counts.
      this.millisPassedSinceLastFpsDrawn = 0;
      this.framesThatWeHaveCollected = 0;
    }
  }

}

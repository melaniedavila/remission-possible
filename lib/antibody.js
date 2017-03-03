// TODO: figure out how to wrap around antibodies on screen or make them stop
// when they hit a wall or slow down progressively to make esier to grab

import moduloWrap from './util.js';

export default class Antibody {
  constructor(stage){
    this.shape = this.createAntibodyShape();
    this.stage = stage;
    this.addEventListeners = this.addEventListeners.bind(this);
    this.addEventListeners();
    this.addToStage();
  }

  // blue
  createAntibodyShape(){
    const circle = new createjs.Shape();
    circle.graphics.beginFill("rgb(162, 216, 255)");
    circle.graphics.drawCircle(20, 20, 20);
    return circle;
  }

  addEventListeners(){
    var tickEventListener;

    this.shape.on('pressmove', function (evt) {
      // removeEventListener for smoother motion
      if (tickEventListener) {
        createjs.Ticker.removeEventListener('tick', tickEventListener);
      }

      this.shape.prevX = this.shape.x;
      this.shape.prevY = this.shape.y;
      this.shape.x = evt.stageX % 800;
      this.shape.y = evt.stageY % 600;
      this.stage.update();
    }.bind(this)).bind(this);

    this.shape.on("pressup", function(evt) {
      const dx = this.shape.x - this.shape.prevX;
      const dy = this.shape.y - this.shape.prevY;

      tickEventListener = function () {
        this.shape.x = moduloWrap(this.shape.x + dx/4, 800);
        this.shape.y = moduloWrap(this.shape.y + dy/4, 600);
        if (this.shape.x < 0) {
          console.log('negative this.shape.x', this.shape.x);
        }
        this.stage.update();
      }.bind(this);

      createjs.Ticker.addEventListener('tick', tickEventListener);
    }.bind(this));
  }

  addToStage(){
    this.stage.addChild(this.shape);
  }
}

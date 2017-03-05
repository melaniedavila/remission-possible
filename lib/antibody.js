// TODO: figure out how to slow down progressively to make esier to grab

import moduloWrap from './util.js';

export default class Antibody {
  constructor(stage) {
    this.attachedCancerCell = null;
    this.radius = 20;
    this.shape = this.createAntibodyShape();
    this.stage = stage;
    this.addEventListeners = this.addEventListeners.bind(this);
    this.addEventListeners();
    this.addToStage();
  }

  // yellow
  createAntibodyShape() {
    const circle = new createjs.Shape();
    circle.graphics.beginFill("rgb(255, 255, 0)");
    circle.graphics.drawCircle(20, 20, 20);
    circle.radius = this.radius;
    // Without below, prevX & prevY start out as undefined. any math done
    // with these values will result in NaN which results in buggy antibody behavior
    circle.prevX = circle.x;
    circle.prevY = circle.y;
    return circle;
  }

  addEventListeners() {
    this.shape.on('pressmove', function (evt) {
      // removeEventListener for smoother motion
      if (this.boundTickEventListener) {
        createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
        this.boundTickEventListener = null;
      }

      this.shape.prevX = this.shape.x;
      this.shape.prevY = this.shape.y;
      this.shape.x = evt.stageX % 800;
      this.shape.y = evt.stageY % 600;
      this.stage.update();
    }.bind(this)).bind(this);

    this.shape.on("pressup", function(evt) {
      this.dx = this.shape.x - this.shape.prevX;
      this.dy = this.shape.y - this.shape.prevY;

      if (!this.boundTickEventListener) {
        this.boundTickEventListener = this.tickEventListener.bind(this)
        createjs.Ticker.addEventListener('tick', this.boundTickEventListener);
      }

    }.bind(this));
  }

  tickEventListener() {
    this.shape.x = moduloWrap(this.shape.x + this.dx/4, 800);
    this.shape.y = moduloWrap(this.shape.y + this.dy/4, 600);
    this.stage.update();
  }

  removeTickEventListener() {
    createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
  }


  addToStage() {
    this.stage.addChild(this.shape);
  }
}

// TODO: figure out how to slow down progressively to make esier to grab

import moduloWrap from './util.js';

const antibodyImagePath = './assets/images/antibody.png'

export default class Antibody {
  constructor(stage) {
    //debugging
    this.color = "rgb(0, 0, 255)";

    this.attachedCancerCell = null;
    this.radius = 25;
    this.shape = this.createAntibodyShape();
    this.stage = stage;
    this.addEventListeners = this.addEventListeners.bind(this);
    this.addEventListeners();
    this.addToStage();
  }

  // yellow
  createAntibodyShape() {
    const antibodyBitmap = new createjs.Bitmap(antibodyImagePath);
    antibodyBitmap.radius = this.radius;
    // greatly helps collision detection
    // as well enables rotation about center
    antibodyBitmap.regX = 25;
    antibodyBitmap.regY = 25;
    antibodyBitmap.x = Math.ceil(Math.random() * 800);
    antibodyBitmap.y = Math.ceil(Math.random() * 600);

    // Without below, prevX & prevY start out as undefined. any math done
    // with these values will result in NaN which results in buggy antibody behavior
    antibodyBitmap.prevX = antibodyBitmap.x;
    antibodyBitmap.prevY = antibodyBitmap.y;
    return antibodyBitmap;
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

    if (this.shape.rotation === 359) {
      this.shape.rotation = 0
    } else {
      this.shape.rotation += 1
    }
    this.stage.update();
  }

  removeTickEventListener() {
    createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
  }


  addToStage() {
    this.stage.addChild(this.shape);
  }
}

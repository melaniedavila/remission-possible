import moduloWrap from './util.js';

const antibodyImagePath = './assets/images/antibody.png'

export default class Antibody {
  constructor() {
    this.attachedCancerCell = null;
    this.flung = false;
    this.radius = 25;
    this.shape = this.createAntibodyShape();
    this.addEventListeners = this.addEventListeners.bind(this);
    this.addEventListeners();
  }

  createAntibodyShape() {
    const antibodyBitmap = new createjs.Bitmap(antibodyImagePath);
    antibodyBitmap.radius = this.radius;

    // Lines 21 & 22 greatly help collision detection & enable rotation
    // about antibody center
    antibodyBitmap.regX = 25;
    antibodyBitmap.regY = 25;

    antibodyBitmap.x = Math.ceil(Math.random() * 750 + 10);
    antibodyBitmap.y = Math.ceil(Math.random() * 500 + 10);

    // Without below, prevX & prevY start out as undefined. Any math done
    // with these values will result in NaN which results in buggy antibody behavior
    antibodyBitmap.prevX = antibodyBitmap.x;
    antibodyBitmap.prevY = antibodyBitmap.y;
    return antibodyBitmap;
  }

  addEventListeners() {
    this.shape.on('mousedown', function (evt) {
      // Removing event listener ensures that antibody ceases to move upon
      // mousedown.
      if (this.boundTickEventListener) {
        createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
        this.boundTickEventListener = null;
      }

      this.shape.rotation += 45;
    }.bind(this));

    this.shape.on('pressmove', function (evt) {
      // Remove event listener for smoother motion
      if (this.boundTickEventListener) {
        createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
        this.boundTickEventListener = null;
      }

      this.shape.prevX = this.shape.x;
      this.shape.prevY = this.shape.y;
      this.shape.x = evt.stageX % 800;
      this.shape.y = evt.stageY % 600;
    }.bind(this)).bind(this);

    this.shape.on("pressup", function(evt) {
      this.dx = this.shape.x - this.shape.prevX;
      this.dy = this.shape.y - this.shape.prevY;
      this.flung = true;

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
  }

  removeTickEventListener() {
    createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
  }
}

const yokoImagePath = './assets/images/yoko.png';

export default class Yoko {
  constructor(stage) {
    this.radius = 50;
    this.shape = this.createYokoShape();
    this.stage = stage;
    this.eventListeners = {
      tick: function () {
        this.shape.x = this.stage.mouseX + 19;
        this.shape.y = this.stage.mouseY - 16;
      }.bind(this)
    };
    this.health = 2500;
  }

  createYokoShape() {
    const yokoBitmap = new createjs.Bitmap(yokoImagePath);
    yokoBitmap.radius = this.radius;
    yokoBitmap.regX = 34;
    yokoBitmap.regY = 49;
    yokoBitmap.prevX = yokoBitmap.x;
    yokoBitmap.prevY = yokoBitmap.y;
    return yokoBitmap;
  }
}

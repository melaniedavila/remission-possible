export default class Yoko {
  constructor(stage) {
    this.radius = 20;
    this.shape = this.createYokoShape();
    this.stage = stage;
    this.health = 50;
    this.eventListeners = {
      tick: function () {
        this.shape.x = this.stage.mouseX;
        this.shape.y = this.stage.mouseY;
        this.stage.update();
      }.bind(this)
    };
  }

  // black
  createYokoShape(){
    const circle = new createjs.Shape();
    circle.graphics.beginFill("rgb(0, 0, 0)");
    circle.graphics.drawCircle(20, 20, 20);
    circle.radius = this.radius;
    return circle;
  }
}

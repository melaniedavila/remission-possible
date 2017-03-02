export default class Yoko {
  constructor(stage) {
    this.shape = this.createYokoShape();
    this.stage = stage;
    this.eventListeners = {
      followCursor: function () {
        const diffX = this.stage.mouseX - this.shape.x;
        const diffY = this.stage.mouseY - this.shape.y;
        this.shape.x += diffX;
        this.shape.y += diffY;
        this.stage.update();
      }.bind(this)
    };
  }

  createYokoShape(){
    const circle = new createjs.Shape();
    // yellow
    circle.graphics.beginFill("rgb(255, 255, 0)");
    circle.graphics.drawCircle(20, 20, 20);
    return circle;
  }
}




// Yoko.prototype.eventListeners = {
//   followCursor: function () {
//     const diffX = stage.mouseX - this.shape.x;
//     const diffY = stage.mouseY - this.shape.y;
//
//     this.shape.x += diffX;
//     this.shape.y += diffY;
//     stage.update();
//   }
// };


// NB: makes circle (yoko) follow mouse
// createjs.Ticker.addEventListener('tick', cursor);
// createjs.Ticker.setFPS(60);
//
// function cursor() {
//   var difX = stage.mouseX - circle1.x;
//   var difY = stage.mouseY - circle1.y;
//
//   circle1.x += difX;
//   circle1.y += difY;
//   stage.update();
// }

export default class CancerCell {
  constructor(stage) {
    this.stage = stage;
    this.shape = this.createCancerCellShape();
    this.shape.x = Math.ceil(Math.random() * 800);
    this.shape.y = Math.ceil(Math.random() * 500);
    this.tickCount = 0;
    this.prevX = this.shape.x;
    this.prevY = this.shape.y;
    this.targetX = Math.ceil(Math.random() * 800) + 100;
    this.targetY = Math.ceil(Math.random() * 500) + 100;

    this.eventListeners = {
      tick: function () {
        if (this.tickCount > 60) {
          this.targetX = Math.ceil(Math.random() * 800) + 100;
          this.targetY = Math.ceil(Math.random() * 500) + 100;
          this.tickCount = 0;
        }
        this.tickCount++;

        this.prevX += (this.targetX - this.prevX)/15;
        this.prevY += (this.targetY - this.prevY)/15;
        this.shape.x += (this.prevX - this.shape.x)/1000;
        this.shape.y += (this.prevY - this.shape.y)/1000;
        this.stage.update();
      }.bind(this)
    };
  }

  // red
  createCancerCellShape(){
    const circle = new createjs.Shape();
    circle.graphics.beginFill("rgb(255, 0, 0)");
    circle.graphics.drawCircle(20, 20, 20);
    return circle;
  }
}


// NB: random cancer cell movement
//   let tickCount = 0;
//   let prevX = 200;
//   let prevY = 200;
//   let targetX = 500;
//   let targetY = 500;
//   createjs.Ticker.addEventListener('tick', handleTick);
//   createjs.Ticker.setFPS(60);
//   function handleTick() {
//     if(tickCount > 100) {
//       targetX = Math.ceil(Math.random()*800) + 100;
//       targetY = Math.ceil(Math.random()*500) + 100;
//       tickCount = 0;
//     }
//     tickCount++;
//
//     prevX += (targetX - prevX)/15;
//     prevY += (targetY - prevY)/15;
//
//     circle.x += (prevX - circle.x)/1000;
//     circle.y += (prevY - circle.y)/1000;
//     stage.update();
//   }

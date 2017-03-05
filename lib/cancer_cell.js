export default class CancerCell {
  constructor(stage) {
    this.attachedAntibody = null;
    this.radius = 20;
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
        if (this.tickCount > 100) {
          this.targetX = Math.ceil(Math.random() * 800) + 100;
          this.targetY = Math.ceil(Math.random() * 500) + 100;
          this.tickCount = 0;
        }
        this.tickCount++;

        this.prevX += (this.targetX - this.prevX)/15;
        this.prevY += (this.targetY - this.prevY)/15;

        const dx = (this.prevX - this.shape.x)/1000;
        const dy = (this.prevY - this.shape.y)/1000;

        this.shape.x += dx;
        this.shape.y += dy;

        if (this.attachedAntibody) {
          this.attachedAntibody.shape.x += dx;
          this.attachedAntibody.shape.y += dy;
        }

        this.stage.update();
      }.bind(this)
    };
  }

  // green
  createCancerCellShape() {
    const circle = new createjs.Shape();
    circle.graphics.beginFill("rgb(0, 255, 0)");
    circle.graphics.drawCircle(20, 20, 20);
    circle.radius = this.radius;
    return circle;
  }
}

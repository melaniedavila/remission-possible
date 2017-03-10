const cancerCellImagePath = './assets/images/cancer_cell.png'
const CANVAS_XDIM = 800;

export default class CancerCell {
  constructor() {
    this.attachedAntibody = null;
    this.radius = 25;
    this.shape = this.createCancerCellShape();
    this.shape.x = Math.ceil(Math.random() * CANVAS_XDIM);
    this.shape.y = Math.ceil(Math.random() * 500);
    // Lines 13 & 14 greatly help collision detection
    this.shape.regX = 36;
    this.shape.regY = 33;
    this.tickCount = 0;
    this.prevX = this.shape.x;
    this.prevY = this.shape.y;
    this.targetX = Math.ceil(Math.random() * CANVAS_XDIM);
    this.targetY = Math.ceil(Math.random() * 500) + 100;

    this.eventListeners = {
      tick: function () {
        if (this.tickCount > 450) {
          this.targetX = Math.ceil(Math.random() * CANVAS_XDIM) + 100;
          this.targetY = Math.ceil(Math.random() * 500) + 100;

          this.tickCount = 0;
        }
        this.tickCount++;

        this.prevX += (this.targetX - this.prevX)/15;
        this.prevY += (this.targetY - this.prevY)/15;

        const dx = (this.prevX - this.shape.x)/400;
        const dy = (this.prevY - this.shape.y)/400;

        this.updateXY(dx, dy);
      }.bind(this)
    };
  }

  createCancerCellShape() {
    const cancerCellBitmap = new createjs.Bitmap(cancerCellImagePath);
    cancerCellBitmap.radius = this.radius;
    cancerCellBitmap.prevX = cancerCellBitmap.x;
    cancerCellBitmap.prevY = cancerCellBitmap.y;
    return cancerCellBitmap;
  }

  updateXY(dx, dy) {
    this.shape.x += dx;
    this.shape.y += dy;

    if (this.attachedAntibody) {
      this.attachedAntibody.shape.x += dx;
      this.attachedAntibody.shape.y += dy;
    }
  }
}

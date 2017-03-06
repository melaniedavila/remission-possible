const immuneSystemCellImagePath = './assets/images/immune_system_cell.png';

export default class ImmuneSystemCell {
  constructor(cancerCell) {
    this.cancerCell = cancerCell;
    this.originalX = Math.ceil((Math.random() * 100) + 900);
    this.originalY = Math.ceil((Math.random() * 100) + 600);
    this.shape = this.createShape();
    this.seekingCancerCell = true;
    this.radius = 38;

    createjs.Ticker.addEventListener(
      'tick',
      this.move.bind(this)
    );

    this.boundCheckIfFoundCancerCell = this.checkIfFoundCancerCell.bind(this)

    createjs.Ticker.addEventListener(
      'tick',
      this.boundCheckIfFoundCancerCell
    );
  }

  checkIfFoundCancerCell() {
    if (this.collided()) {
      this.seekingCancerCell = false;
      createjs.Ticker.removeEventListener(
        'tick',
        this.boundCheckIfFoundCancerCell
      );

      createjs.Ticker.addEventListener(
        'tick',
        this.neutralizeCancerCellWhenOffScreen.bind(this)
      )
    }
  }

  neutralizeCancerCellWhenOffScreen() {
    if (this.offscreen()) {
      this.cancerCell.neutralized = true;
    }
  }

  offscreen() {
    return (this.shape.x > 800 || this.shape.x < 0) && (this.shape.y > 600 || this.shape.y < 0);
  }

  collided() {
    const dx = this.shape.x - this.cancerCell.shape.x;
    const dy = this.shape.y - this.cancerCell.shape.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + this.cancerCell.shape.radius;
  }

  move() {
    if (this.seekingCancerCell) {
      this.moveTowardsCancerCell();
    } else {
      this.moveOffScreen();
    }
  }

  moveTowardsCancerCell() {
    const dx = (this.cancerCell.shape.x - this.shape.x)/25;
    const dy = (this.cancerCell.shape.y - this.shape.y)/25;

    this.shape.x += dx;
    this.shape.y += dy;
  }

  moveOffScreen() {
    const dx = (this.originalX - this.shape.x)/25;
    const dy = (this.originalY - this.shape.y)/25;
    this.shape.x += dx;
    this.shape.y += dy;
    this.cancerCell.updateXY(dx, dy);
  }

  createShape() {
    const bitmap = new createjs.Bitmap(immuneSystemCellImagePath);
    bitmap.radius = this.radius;
    bitmap.x = this.originalX;
    bitmap.y = this.originalY;
    bitmap.prevX = bitmap.x;
    bitmap.prevY = bitmap.y;
    bitmap.regX = 50;
    bitmap.regY = 50;
    return bitmap;
  }
}

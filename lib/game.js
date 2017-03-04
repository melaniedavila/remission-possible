import Antibody from './antibody';
import CancerCell from './cancer_cell';
import GameView from './game_view';
import Yoko from './yoko';

export default class Game {
  constructor(stage){
    // TODO: find most efficient way to pass stage. ATM, both GameView & Game know about it
    this.stage = stage;
    this.antibodies = [];
    this.cancerCells = [];
    this.level = 1;
    this.addAntibodies();
    this.addCancerCells();
    this.addYoko();
  }

  forEachObject(callback) {
    this.antibodies.forEach(callback);
    this.cancerCells.forEach(callback);
    callback(this.yoko);
  }

  forEachAntibody(callback) {
    this.antibodies.forEach(callback);
  }

  forEachCancerCell(callback) {
    this.cancerCells.forEach(callback);
  }

  addAntibodies(){
    for (let i = 0; i < 5; i++) {
      this.antibodies.push(new Antibody(this.stage));
    }
  }

  addCancerCells(){
    for (let i = 0; i < 5; i++) {
      this.cancerCells.push(new CancerCell(this.stage));
    }
  }

  addYoko(){
    this.yoko = new Yoko(this.stage);
  }

  checkForCollisions() {
    this.checkForAntibodyCancerCellCollisions();
    this.checkForYokoCancerCellCollisions();
  }

  checkForAntibodyCancerCellCollisions() {
    const antibodies = this.antibodies;
    const cancerCells = this.cancerCells;
    for (let i = 0; i < antibodies.length; i++) {
      for (let j = 0; j < cancerCells.length; j++) {
        if (this.areCollided(antibodies[i], cancerCells[j])) {
          const antibody = antibodies[i];
          const cancerCell = cancerCells[j]
          // only attach antibody to cancerCell if cancerCell is free of attachments
          if (!cancerCell.hasAttachedAntibody) {
            cancerCell.hasAttachedAntibody = true;
            // TODO: stick these two together
            debugger
            this.attachAntibodyToCancerCell(antibody, cancerCell);
          }
        }
      }
    }
  }

  // the motion of the antibody becomes dependent on the motion of the cancer cell
  //
  // when they first collide, set the x/y position of the antibody to be
  //  exactly equal to (the radius of the antibody + the radius of the cancer cell)
  //
  // that way it'll look like they're touching
  //
  // also, remove the antibody's own event listeners
  //
  // then, move the x/y position of the antibody by however much you
  // move the x/y of the cancer cell
  //

  attachAntibodyToCancerCell(antibody, cancerCell) {
    antibody.shape.x = (antibody.radius + cancerCell.radius);
    antibody.shape.y = (antibody.radius + cancerCell.radius);
    // remove the antibody's own eventListeners
    antibody.shape.removeAllEventListeners();
    // move the x/y position of the antibody by same as cancerCell

  }

  checkForYokoCancerCellCollisions() {
    const yoko = this.yoko;
    const cancerCells = this.cancerCells;
    for (let i = 0; i < cancerCells.length; i++) {
      if (this.areCollided(yoko, cancerCells[i])) {
        // console.log('cancer cell yoko collision!'); // NOTE: this console.logs ALOT for each collision; figure out appropriate health
        yoko.health -= 1;
        console.log('yoko collision with cancer cell, health: ', yoko.health);
        this.updateHealthMeter();
      }
    }
  }

  updateHealthMeter() {
    document.getElementById('health-level').style.width = `${ this.yoko.health / 10 }px`;
  }

  areCollided(obj1, obj2) {
    debugger
    const dx = obj1.shape.x - obj2.shape.x;
    const dy = obj1.shape.y - obj2.shape.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < obj1.radius + obj2.radius);
  }


  // returns true if yoko's health is 0 or all cancer cells have attached antibodies
  isLevelOver() {
    return (this.yoko.health === 0 || this.cancerCells.every((cancerCell) => cancerCell.hasAttachedAntibody));
  }

  // assumes we only have 3 levels
  isWon() {
    return (this.level === 3 && this.isLevelOver());
  }
}

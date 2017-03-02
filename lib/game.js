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
    // this.addAntibodies();
    // this.addCancerCells();
    this.addYoko();
  }

  forEachObject(callback) {
    // this.antibodies.forEach(callback);
    // this.cancerCells.forEach(callback);
    callback(this.yoko);
  }

  addAntibodies(){
    for (let i = 0; i < 5; i++) {
      this.antibodies.push(new Antibody(this.stage)); // TODO: what params to pass????
    }
  }

  addCancerCells(){
    for (let i = 0; i < 5; i++) {
      this.cancerCells.push(new CancerCell()); // TODO: what params to pass????
    }
  }

  addYoko(){
    this.yoko = new Yoko(this.stage); // TODO: what params to pass????
  }
}

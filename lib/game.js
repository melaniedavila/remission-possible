import Antibody from './antibody';
import CancerCell from './cancer_cell';
import GameView from './game_view';
import Yoko from './yoko';

export default class Game {
  constructor(){
    this.antibodies = [];
    this.cancer_cells = [];

    this.addAntibodies();
    // this.addCancerCells();
    // this.addYoko();
  }

  addAntibodies(){
    for (let i = 0; i < 5; i++) {
      this.antibodies.push(new Antibody()); // TODO: what params to pass????
    }
  }

  addCancerCells(){
    for (let i = 0; i < 5; i++) {
      this.cancer_cells.push(new CancerCell()); // TODO: what params to pass????
    }
  }

  addYoko(){
    const yoko = new Yoko(); // TODO: what params to pass????
    this.yoko = yoko;
  }
}

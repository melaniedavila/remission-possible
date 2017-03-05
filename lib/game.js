import Antibody from './antibody';
import CancerCell from './cancer_cell';
import GameView from './game_view';
import Yoko from './yoko';

export default class Game {
  constructor(stage, level) {
    // TODO: find most efficient way to pass stage. ATM, both GameView & Game know about it
    this.stage = stage;
    this.level = level;
    this.antibodies = [];
    this.cancerCells = [];
    this.addObjects();
  }

  addObjects() {
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

  addAntibodies() {
    for (let i = 0; i < (this.level * 5); i++) {
      this.antibodies.push(new Antibody(this.stage));
    }
  }

  addCancerCells() {
    for (let i = 0; i < (this.level * 5); i++) {
      this.cancerCells.push(new CancerCell(this.stage));
    }
  }

  addYoko() {
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
        // only attach antibody to cancerCell if cancerCell is free of attachments
        const antibody = antibodies[i];
        const cancerCell = cancerCells[j]

        if (this.areNotAttached(antibody, cancerCell) && this.areCollided(antibody, cancerCell)) {
          this.attachAntibodyToCancerCell(antibody, cancerCell);
        }
      }
    }
  }

  areNotAttached(antibody, cancerCell) {
    return !cancerCell.attachedAntibody && !antibody.attachedCancerCell
  }

  attachAntibodyToCancerCell(antibody, cancerCell) {
    antibody.removeTickEventListener();
    antibody.shape.removeAllEventListeners();
    cancerCell.attachedAntibody = antibody;
    antibody.attachedCancerCell = cancerCell;
  }

  checkForYokoCancerCellCollisions() {
    const yoko = this.yoko;
    const cancerCells = this.cancerCells;
    for (let i = 0; i < cancerCells.length; i++) {
      if (this.areCollided(yoko, cancerCells[i])) {
        yoko.health -= 1;
        this.updateHealthMeter();
      }
    }
  }

  updateHealthMeter() {
    document.getElementById('health-level').style.width = `${ this.yoko.health / 10 }px`;
  }

  areCollided(obj1, obj2) {
    const dx = obj1.shape.x - obj2.shape.x;
    const dy = obj1.shape.y - obj2.shape.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < obj1.radius + obj2.radius);
  }

  handleYokoHealthDepletion() {
    if (this.isYokoHealthDepleted()) {
      document.getElementById('try-again-modal').classList.remove('hidden');
    }
  }

  handleGameWon() {
    if (this.isGameWon()) {
      // (Re)Mission Complete modal
    }
  }

  handleLevelWon() {
    if (this.isLevelWon()) {
      // immune system wipes away cancer and you move to next level
      // create white cells off screen
      // each white cell targets one cancer-antibody pair
      // each white cell moves quickly towards the pair
      // then, maybe, we do something similar to cancer-antibody attachment
      // where the pair's movement becomes dependent on the white cell
      // then the white cell moves offscreen
      this.prepareForNextLevel();
      this.startLevel();
    }
  }

  prepareForNextLevel() {
    this.level++;
    // remove listeners
    createjs.Ticker.removeAllEventListeners();
    // remove objects from stage
    this.stage.removeAllChildren();
    this.removeObjects();
    this.addObjects();
    this.updateHealthMeter();
  }


 // !!!!!!!!!!!!!!!!
  startLevel() {
    this.addObjectsToStage();
    this.addObjectEventListenersToTicker();
    this.addCollisionListener();
    this.addGameProgressListeners();
    this.stage.update();
  }

  addObjectsToStage() {
    this.forEachObject(function (obj) {
      this.stage.addChild(obj.shape);
    }.bind(this));
  }

  addObjectEventListenersToTicker() {
    this.forEachObject(function (obj) {
      // console.log('forEachObject obj:', obj) //=> Antibody {shape: a, stage: a, eventListeners: Object}
      for (var eventListenerType in obj.eventListeners) {
        // console.log('eventListenerType', eventListenerType); //=> pressmove
        // console.log('obj.eventListeners', obj.eventListeners); //=> Object {}
        // console.log('obj.eventListeners[eventListenerType]', obj.eventListeners[eventListenerType]);
        // => function (evt) {
        // var dx = this.shape.x - this.shape.prevX;
        // var dy = this.shape.y - this.shape.prevY;
        // if (antibodyEventListener) {
        //   createjs.Ticker.removeEventListener(…
        createjs.Ticker.addEventListener(
          eventListenerType,
          obj.eventListeners[eventListenerType]
        );
      }
    }.bind(this));
  }

  addCollisionListener() {
    createjs.Ticker.addEventListener("tick", this.checkForCollisions.bind(this));
  }

  addGameProgressListeners() {
    this.addGameWonListener();
    this.addYokoHealthDepletedListener();
    this.addLevelWonListener();
  }

  addGameWonListener() {
    createjs.Ticker.addEventListener("tick", this.handleGameWon.bind(this));
    // consider play again button
  }

  // renders appropriate modal and registers listeners on the modals
  addYokoHealthDepletedListener() {
    createjs.Ticker.addEventListener("tick", this.handleYokoHealthDepletion.bind(this));
  }

  addLevelWonListener() {
    createjs.Ticker.addEventListener("tick", this.handleLevelWon.bind(this));
  }

  removeObjects() {
    this.antibodies = [];
    this.cancerCells = [];
    this.yoko = null;
  }

  // returns true if all cancer cells have attached antibodies
  isLevelWon() {
    return this.cancerCells.every((cancerCell) => cancerCell.attachedAntibody);
  }

  isYokoHealthDepleted() {
    return this.yoko.health <= 0;
  }

  // assumes we only have 3 levels
  isGameWon() {
    return (this.level === 3 && this.isLevelWon());
  }
}

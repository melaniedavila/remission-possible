import Antibody from './antibody';
import CancerCell from './cancer_cell';
import GameView from './game_view';
import ImmuneSystemCell from './immune_system_cell';
import Yoko from './yoko';

export default class Game {
  constructor(stage, level) {
    this.stage = stage;
    this.level = level;
    this.antibodies = [];
    this.cancerCells = [];
    this.immuneSystemCells = [];
    this.addObjects();
  }

  addAntibodies() {
    for (let i = 0; i < (this.level * 5); i++) {
      this.antibodies.push(new Antibody());
    }
  }

  addCancerCells() {
    for (let i = 0; i < (this.level * 5); i++) {
      this.cancerCells.push(new CancerCell());
    }
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
  }

  addImmuneSystemCells() {
    var immuneSystemCell;
    this.cancerCells.forEach(cancerCell => {
      immuneSystemCell = new ImmuneSystemCell(cancerCell);
      this.stage.addChild(immuneSystemCell.shape);
      this.immuneSystemCells.push(immuneSystemCell);
    });
  }

  addLevelWonListener() {
    createjs.Ticker.addEventListener("tick", this.handleLevelWon.bind(this));
  }

  addObjectEventListenersToTicker() {
    this.forEachObject(function (obj) {
      for (var eventListenerType in obj.eventListeners) {
        createjs.Ticker.addEventListener(
          eventListenerType,
          obj.eventListeners[eventListenerType]
        );
      }
    }.bind(this));
  }

  addObjects() {
    this.addAntibodies();
    this.addCancerCells();
    this.addYoko();
  }

  addObjectsToStage() {
    this.forEachObject(function (obj) {
      this.stage.addChild(obj.shape);
    }.bind(this));
  }

  addYoko() {
    this.yoko = new Yoko(this.stage);
  }

  addYokoHealthDepletedListener() {
    createjs.Ticker.addEventListener("tick", this.handleYokoHealthDepletion.bind(this));
  }

  areCollided(obj1, obj2) {
    const dx = obj1.shape.x - obj2.shape.x;
    const dy = obj1.shape.y - obj2.shape.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < obj1.radius + obj2.radius;
  }

  areNotAttached(antibody, cancerCell) {
    return !cancerCell.attachedAntibody && !antibody.attachedCancerCell
  }

  attachAntibodyToCancerCell(antibody, cancerCell) {
    antibody.removeTickEventListener();
    antibody.shape.removeAllEventListeners();
    cancerCell.attachedAntibody = antibody;
    antibody.attachedCancerCell = cancerCell;
    // Gives user visual & audio cues that antibody has successfully attached
    antibody.changeColorUponCancerCellAttachment();
    antibody.playSoundEffectUponCancerCellAttachment();
  }

  checkForAntibodyCancerCellCollisions() {
    const antibodies = this.antibodies.filter((antibody) => antibody.flung === true);
    const cancerCells = this.cancerCells;
    for (let i = 0; i < antibodies.length; i++) {
      for (let j = 0; j < cancerCells.length; j++) {
        const antibody = antibodies[i];
        const cancerCell = cancerCells[j]

        // Only attach antibody to cancerCell if cancerCell is free of attachments
        if (this.areNotAttached(antibody, cancerCell) && this.areCollided(antibody, cancerCell)) {
          this.attachAntibodyToCancerCell(antibody, cancerCell);
        }
      }
    }
  }

  checkForCollisions() {
    this.checkForAntibodyCancerCellCollisions();
    this.checkForYokoCancerCellCollisions();
  }

  checkForYokoCancerCellCollisions() {
    const yoko = this.yoko;
    const cancerCells = this.cancerCells;
    for (let i = 0; i < cancerCells.length; i++) {
      if (this.areCollided(yoko, cancerCells[i])) {
        yoko.health -= 3;
        this.updateHealthMeter();
      }
    }
  }

  forEachAntibody(callback) {
    this.antibodies.forEach(callback);
  }

  forEachCancerCell(callback) {
    this.cancerCells.forEach(callback);
  }

  forEachObject(callback) {
    this.antibodies.forEach(callback);
    this.cancerCells.forEach(callback);
    this.immuneSystemCells.forEach(callback);
    callback(this.yoko);
  }

  handleYokoHealthDepletion() {
    if (this.isYokoHealthDepleted()) {
      document.getElementById('try-again-modal').classList.remove('hidden');
    }
  }

  handleGameWon() {
    if (this.isGameWon()) {
      this.transitionining = true;
      this.removeTickListeners();
      // Remove all tick listeners, but then reattach the one that
      // updates the stage
      this.renderOnTick();
      this.listenForFinalCancerCellsNeutralized();
      this.addImmuneSystemCells();
    }
  }

  handleLevelWon() {
    if (this.isLevelWon() && this.level < 3) {
      this.transitionining = true;
      this.removeTickListeners();
      // Remove all tick listeners, but then reattach the one that
      // updates the stage
      this.renderOnTick();
      this.listenForAllCancerCellsNeutralized();
      this.addImmuneSystemCells();
    }
  }

  isGameWon() {
    return (this.level === 3 && this.isLevelWon());
  }

  isLevelWon() {
    return this.cancerCells.every((cancerCell) => cancerCell.attachedAntibody);
  }

  isYokoHealthDepleted() {
    return this.yoko.health <= 0;
  }

  listenForAllCancerCellsNeutralized() {
    createjs.Ticker.addEventListener('tick', () => {
      if (this.cancerCells.every(cancerCell => cancerCell.neutralized)) {
        this.prepareForNextLevel();
        this.startLevel();
      }
    });
  }

  listenForFinalCancerCellsNeutralized() {
    createjs.Ticker.addEventListener('tick', () => {
      if (this.cancerCells.every(cancerCell => cancerCell.neutralized)) {
        document.getElementById('winner-modal').classList.remove('hidden');
      }
    });
  }

  prepareForNextLevel() {
    this.level++;
    this.stage.removeAllChildren();
    this.removeObjects();
    this.addObjects();
    this.updateHealthMeter();
    this.updateLevelIndicator();
  }

  removeObjects() {
    this.antibodies = [];
    this.cancerCells = [];
    this.yoko = null;
  }

  renderOnTick() {
    createjs.Ticker.addEventListener('tick', () => {
      this.stage.update();
    })
  }

  removeTickListeners() {
    createjs.Ticker.removeAllEventListeners();
  }

  startLevel() {
    this.addObjectsToStage();
    this.addObjectEventListenersToTicker();
    this.addCollisionListener();
    this.addGameProgressListeners();
    this.renderOnTick();
  }

  updateHealthMeter() {
    document.getElementById('health-level').style.width = `${ this.yoko.health / 10 }px`;
  }

  updateLevelIndicator() {
    document.getElementById("level").textContent= `Level ${this.level}`;
  }
}

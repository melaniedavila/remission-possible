import Game from './game';

export default class GameView {
  constructor(game) {
    this.game = game;
    this.stage = this.game.stage;
  }

  addObjectsToStage() {
    this.game.forEachObject(function (obj) {
      this.stage.addChild(obj.shape);
      // console.log('addingObjectToStage', obj);
      // this.stage.update();
    }.bind(this));
  }

  addObjectEventListenersToTicker() {
    this.game.forEachObject(function (obj) {
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
    createjs.Ticker.addEventListener("tick", this.game.checkForCollisions.bind(this.game));
  }

  addGameProgressListeners() {
    this.addGameWonListener();
    this.addYokoHealthDepletedListener();
    this.addLevelWonListener();
  }

  addGameWonListener() {
    createjs.Ticker.addEventListener("tick", this.game.handleGameWon.bind(this.game));
    // consider play again button
  }

  // renders appropriate modal and registers listeners on the modals
  addYokoHealthDepletedListener() {
    createjs.Ticker.addEventListener("tick", this.game.handleYokoHealthDepletion.bind(this.game));
    document.getElementById('try-again-button').addEventListener('click', this.closeModalAndRestartLevel.bind(this));
  }

  addLevelWonListener() {
    createjs.Ticker.addEventListener("tick", this.game.handleLevelWon.bind(this.game));

  }

  listenForGameStartClick() {
    document.getElementById('start-button').addEventListener('click', this.closeModalAndStartGame.bind(this));
  }

  closeModalAndRestartLevel(e) {
    e.preventDefault();
    document.getElementById('try-again-modal').className = 'hidden';
    this.restartLevel();
  }

  closeModalAndStartGame(e) {
    e.preventDefault();
    document.getElementById('start-modal').className = 'hidden';
    this.startGame();
  }

  restartLevel() {
    createjs.Ticker.removeAllEventListeners();
    this.stage.removeAllChildren();
    const stage = this.stage;
    const level = this.game.level;
    this.game = new Game(stage, level);
    this.game.updateHealthMeter();
    this.startLevel();
  }

  startLevel() {
    this.addObjectsToStage();
    this.addObjectEventListenersToTicker();
    this.addCollisionListener();
    this.addGameProgressListeners();
    this.stage.update();
  }

  startGame() {
    this.game.level = 1;
    this.startLevel();
  }
}

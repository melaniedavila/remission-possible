import Game from './game';

export default class GameView {
  constructor(game) {
    this.game = game;
    this.stage = this.game.stage;
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
    this.game.startLevel();
  }

  startGame() {
    document.getElementById('try-again-button').addEventListener('click', this.closeModalAndRestartLevel.bind(this));
    this.game.level = 1;
    this.game.startLevel();
  }
}

import Game from './game';

export default class GameView {
  constructor(game) {
    this.game = game;
    this.stage = this.game.stage;
    this.setUpMusic();
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

  listenForGameStartAndMusicToggleClicks() {
    this.listenForGameStartClick();
    this.listenForPauseMusicClick();
    this.listenForPlayMusicClick();
  }

  listenForGameStartClick() {
    document.getElementById('start-button').addEventListener('click', this.closeModalAndStartGame.bind(this));
  }

  listenForPauseMusicClick() {
    document.getElementById('music-playing-icon').addEventListener('click', this.pauseMusic.bind(this));
  }

  listenForPlayMusicClick() {
    document.getElementById('music-paused-icon').addEventListener('click', this.playMusic.bind(this));
  }

  pauseMusic(){
    document.getElementById('music-playing-icon').classList.add('hidden');
    document.getElementById('music-paused-icon').classList.remove('hidden');
    this.music.pause()
  }

  playMusic(){
    document.getElementById('music-paused-icon').classList.add('hidden');
    document.getElementById('music-playing-icon').classList.remove('hidden');
    this.music.play();
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

  setUpMusic() {
    this.music = new Audio('./assets/sounds/background.mp3');
    this.music.loop = true;
    this.playMusic();
  }

  startGame() {
    document.getElementById('try-again-button').addEventListener('click', this.closeModalAndRestartLevel.bind(this));
    this.game.level = 1;
    this.game.startLevel();
  }
}

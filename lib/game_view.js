import Game from './game';

export default class GameView {
  constructor(game) {
    this.game = game;
    this.stage = this.game.stage;
    this.setUpMusic();
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
    document.getElementById('play-music-icon').addEventListener('click', this.pauseMusic.bind(this));
  }

  listenForPlayMusicClick() {
    document.getElementById('pause-music-icon').addEventListener('click', this.playMusic.bind(this));
  }

  setUpMusic() {
    this.music = new Audio('./assets/sounds/background.mp3');
    this.music.loop = true;
    this.playMusic();
  }

  pauseMusic(){
    document.getElementById('play-music-icon').classList.add('hidden');
    document.getElementById('pause-music-icon').classList.remove('hidden');
    this.music.pause()
  }

  playMusic(){
    document.getElementById('pause-music-icon').classList.add('hidden');
    document.getElementById('play-music-icon').classList.remove('hidden');
    this.music.play();
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

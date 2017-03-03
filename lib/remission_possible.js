import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", function () {
  createjs.Ticker.setFPS(60);
  const stage = new createjs.Stage(canvas);
  const game = new Game(stage);
  new GameView(game).start();
